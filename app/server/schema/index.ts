import { ApolloServer, Config } from 'apollo-server-express'
import { RedisCache } from 'apollo-server-redis'
import * as express from 'express'
import { IResolvers } from 'graphql-tools'
import * as LRU from 'lru-cache'

import * as Mutation from './mutations'
import * as Query from './queries'
import typeDefs, { Context } from './types'

const router = express.Router()

const resolvers: IResolvers<{}, Context> = {
  Query,
  Mutation,
  JSON: require('graphql-type-json'),
  Date: require('graphql-iso-date').GraphQLDateTime
}

module.exports = ({
  app,
  cache,
  dev = false
}: {
  app: express.Express
  cache: LRU.Cache<any, any>
  dev?: boolean
}) => {
  const options: Config = {
    typeDefs,
    resolvers,
    context: { cache },
    introspection: dev,
    playground: dev,
    tracing: dev,
    cacheControl: true
  }

  if (process.env.REDIS_URL) {
    try {
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

      options.cache = redis as any
    } catch (err) {
      console.log('Could not start up redis')
      console.error(err)
    }
  }

  new ApolloServer(options).applyMiddleware({ app })

  return router
}
