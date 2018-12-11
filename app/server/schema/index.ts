import { KeyValueCache } from 'apollo-server-core'
import { ApolloServer, Config } from 'apollo-server-express'
import { RedisCache } from 'apollo-server-redis'
import * as express from 'express'
import { IResolvers } from 'graphql-tools'
import * as mongoose from 'mongoose'
import slugify from 'slugify'

import * as Mutation from './mutations'
import * as Query from './queries'
import typeDefs, { Context, Tag } from './types'

const router = express.Router()

const resolvers: IResolvers<{}, Context> = {
  Query,
  Mutation,
  JSON: require('graphql-type-json'),
  Date: require('graphql-iso-date').GraphQLDateTime,

  Tag: {
    slug: async ({ title }: Tag) => slugify(title)
  }
}

module.exports = ({
  app,
  cache,
  dev = false
}: {
  app: express.Express
  cache: KeyValueCache
  dev?: boolean
}) => {
  const options: Config & { context: Context } = {
    typeDefs,
    resolvers,
    context: { cache },
    introspection: dev,
    playground: dev,
    tracing: dev,
    cacheControl: true
  }

  try {
    if (process.env.REDIS_URL) {
      const redis = new RedisCache({
        url: process.env.REDIS_URL,
        socket_keepalive: false,
        retry_strategy({ attempt }) {
          console.log('Redis Retry', attempt)

          if (attempt >= 3) {
            return undefined
          }

          return Math.min(attempt * 50, 2e4)
        }
      })

      options.cache = redis as RedisCache['client']
    }

    if (process.env.MONGO_URL) {
      ;(async () => {
        mongoose.Types.ObjectId.prototype.valueOf = function() {
          return this.toString()
        }

        const db = await mongoose.connect(
          process.env.MONGO_URL,
          {
            dbName: 'datasets',
            useNewUrlParser: true
          }
        )

        options.context.mongo = db.connection
      })()
    }
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    new ApolloServer(options).applyMiddleware({ app })
  }

  return router
}
