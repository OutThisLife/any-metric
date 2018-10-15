import { ApolloServer } from 'apollo-server-express'
import * as compression from 'compression'
import * as express from 'express'
import { RequestHandlerParams } from 'express-serve-static-core'
import * as helmet from 'helmet'
import * as LRU from 'lru-cache'
import * as morgan from 'morgan'
import * as next from 'next'
import * as path from 'path'

import resolvers, { typeDefs } from './schema'

export const dev = process.env.NODE_ENV !== 'production'
export const dir = path.resolve(process.cwd(), 'app')
export const port = parseInt(process.env.PORT, 10) || 3000
export const nextApp = next({ dir, dev })
export const handle = nextApp.getRequestHandler() as RequestHandlerParams
export const app = express()

export const cache = LRU({
  max: 152,
  maxAge: 36e2
})

if (!dev && process.env.NEW_RELIC_HOME) {
  require('newrelic')
}

nextApp.prepare().then(() => {
  if (!dev) {
    app
      .use(helmet())
      .use(morgan())
      .use(
        compression({
          level: 6,
          filter: () => true
        })
      )
      .use(({ secure, headers, hostname, url }, res, resolve) => {
        if (!secure && headers['x-forwarded-proto'] !== 'https') {
          return res.redirect(`https://${hostname}${url}`)
        }

        return resolve()
      })
  }

  new ApolloServer({
    typeDefs,
    resolvers,
    introspection: dev,
    playground: dev,
    context: { cache }
  }).applyMiddleware({ app })

  app.use(require('./api'))
  app.use(require('./routes'))
  app.get('*', handle).listen(port, err => {
    if (err) {
      throw err
    }

    console.log(`>ready on http://[::1]:${port}\n🚀`)
  })
})
