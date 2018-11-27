import * as compression from 'compression'
import * as express from 'express'
import { RequestHandlerParams } from 'express-serve-static-core'
import * as helmet from 'helmet'
import * as LRU from 'lru-cache'
import * as morgan from 'morgan'
import * as next from 'next'
import * as path from 'path'

export const dev = process.env.NODE_ENV !== 'production'

if (!dev && process.env.NEW_RELIC_HOME) {
  require('newrelic')
}

export const dir = path.resolve(process.cwd(), 'app')
export const port = parseInt(process.env.PORT, 10) || 3000
export const nextApp = next({ dir, dev })
export const handle = nextApp.getRequestHandler() as RequestHandlerParams

export const cache = LRU({
  max: 152,
  maxAge: 36e2
})

nextApp.prepare().then(() => {
  const app = express()

  app
    .use(helmet())
    .use(morgan('combined', {}))
    .use(
      compression({
        level: 6,
        filter: () => true
      })
    )

    .use(require('./schema')(app))
    .use(require('./routes'))
    .get('*', handle)

    .listen(port, err => {
      if (err) {
        throw err
      }

      console.log(`>ready on http://[::1]:${port}\n🚀`)
    })
})
