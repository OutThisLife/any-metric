import { ApolloServer, Config } from 'apollo-server-express'
import * as express from 'express'
import * as mongoose from 'mongoose'

import resolvers from './resolvers'
import typeDefs, { Context } from './types'

const router = express.Router()

mongoose.Types.ObjectId.prototype.valueOf = function() {
  return this.toString()
}

mongoose.set('debug', true)
;(mongoose as any).Promise = global.Promise

module.exports = ({ app, cache }) => {
  const options: Config & { context: Context } = {
    typeDefs,
    resolvers,
    context: { cache },
    introspection: true,
    playground: true,
    tracing: true,
    cacheControl: true
  }

  try {
    if (process.env.MONGO_URL) {
      ;(async () => {
        const db = await mongoose.connect(process.env.MONGO_URL, {
          dbName: 'datasets',
          useNewUrlParser: true
        })

        options.context.mongo = db.connection
        ;['tags', 'products', 'view'].forEach(
          c => (options.context.mongo[c] = db.connection.collection(c))
        )
      })()
    }

    new ApolloServer(options).applyMiddleware({ app })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  return router
}
