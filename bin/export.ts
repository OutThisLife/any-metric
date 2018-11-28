import { spawn } from 'child_process'
import * as express from 'express'
import * as LRU from 'lru-cache'

const app = express()
const dev = process.env.NODE_ENV !== 'production'
const cmd = /^win/.test(process.platform) ? 'yarn.cmd' : 'yarn'

const cache = LRU({
  max: 152,
  maxAge: 36e2
})

try {
  const server = app
    .use(require('../app/server/schema')({ app, cache, dev }))
    .listen(3e3, err => {
      if (err) {
        console.error(err)
        throw err
      }

      console.log('> GraphQL server started; running export')

      const build = spawn(cmd, ['export:app'], {
        stdio: 'inherit',
        shell: true
      })

      build.on('close', () => {
        console.log('> Export done; closing server')
        server.close()
        process.exit(0)
      })
    })
} catch (err) {
  console.trace(err)
  process.exit(1)
}
