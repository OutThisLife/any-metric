import 'isomorphic-unfetch'

import * as compression from 'compression'
import * as express from 'express'
import { RequestHandlerParams } from 'express-serve-static-core'
import * as helmet from 'helmet'
import * as LRU from 'lru-cache'
import * as morgan from 'morgan'
import * as next from 'next'
import * as path from 'path'

const dev = process.env.NODE_ENV !== 'production'

if (!dev && process.env.NEW_RELIC_HOME) {
  require('newrelic')
}

const dir = path.resolve(process.cwd(), 'app')
const port = parseInt(process.env.PORT, 10) || 3000
const nextApp = next({ dir, dev })
const handle = nextApp.getRequestHandler() as RequestHandlerParams

export const cache = LRU({
  max: 152,
  maxAge: 36e2
})

nextApp.prepare().then(() => {
  const app = express()

  if (!dev) {
    app
      .use(helmet())
      .use(morgan('combined', {}))
      .use(
        compression({
          level: 6,
          filter: () => true
        })
      )
  }

  app
    .use((req, _, resolve) => {
      if (!('API_URL' in nextApp.nextConfig.publicRuntimeConfig)) {
        Object.defineProperty(
          nextApp.nextConfig.publicRuntimeConfig,
          'API_URL',
          {
            value: `${req.protocol}://${req.headers.host}/graphql`
          }
        )
      }

      return resolve()
    })

    .use((req, res, resolve) => {
      let staticUrl

      if (req.url.endsWith('service-worker.js')) {
        staticUrl = path.join(dir, `./.next/${req.url}`)
      } else if (/(robots\.txt)$/.test(req.url)) {
        staticUrl = path.join(dir, `./static/${req.url}`)
      }

      if (staticUrl) {
        return nextApp.serveStatic(req, res, staticUrl)
      }

      return resolve()
    })

    .use(require('./schema')({ app, cache, dev }))
    .use(require('./routes')({ nextApp, cache, dev }))

    .get('*', handle)
    .listen(port, err => {
      if (err) {
        console.error(err)
        throw err
      }

      console.log(`>ready on http://[::1]:${port}\n🚀`)
    })
})
