import { KeyValueCache } from 'apollo-server-core'
import { ApolloServer, Config } from 'apollo-server-express'
import { RedisCache } from 'apollo-server-redis'
import * as express from 'express'
import * as mongoose from 'mongoose'

import resolvers from './resolvers'
import typeDefs, { Context } from './types'

const router = express.Router()

mongoose.Types.ObjectId.prototype.valueOf = function() {
  return this.toString()
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
        socket_keepalive: false
      })

      options.cache = redis as RedisCache['client']
    }

    if (process.env.MONGO_URL) {
      ;(async () => {
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
