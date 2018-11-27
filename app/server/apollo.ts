import * as express from 'express'
import * as LRU from 'lru-cache'

const app = express()
const dev = process.env.NODE_ENV !== 'production'

const cache = LRU({
  max: 152,
  maxAge: 36e2
})

const server = app
  .use(require('./schema')({ app, cache, dev }))
  .listen(3e3, err => {
    if (err) {
      console.error(err)
      process.exit(1)
      throw err
    }

    console.log('Graphql standalone started')
  })

process.on('exit', () => server.close())
