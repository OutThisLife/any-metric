const next = require('next')
const express = require('express')
const LRUCache = require('lru-cache')
const path = require('path')
const { ApolloServer } = require('apollo-server')

const dev = process.env.NODE_ENV !== 'production'

if (!dev) {
  require('newrelic')
}

const dir = path.resolve(process.cwd(), 'app')
const port = process.env.PORT || 3000

const app = next({ dev })
const handle = app.getRequestHandler()

const cache = new LRUCache({
  max: 100,
  maxAge: 36e5
})

// -----------------------------------------

const render = (page = '/') => (req, res) => {
  const key = req.url

  if (!dev && cache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(cache.get(key))
    return
  }

  try {
    ;(async () => {
      const html = await app.renderToHTML(req, res, page, req.params)

      if (res.statusCode !== 200) {
        res.send(html)
        return
      }

      cache.set(key, html)

      res.setHeader('x-cache', 'MISS')
      res.send(html)
    })()
  } catch (err) {
    app.renderError(err, req, res, req.query)
  }
}

// -----------------------------------------

app.prepare().then(() => {
  const { typeDefs, resolvers } = require('./schema')

  new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
      endpoint: '/graphiql'
    }
  })
    .listen()
    .then(({ url }) => {
      console.log(`🚀  graphql server ready at ${url}`)
    })
    .catch(err => {
      throw err
    })

  express()
    .use(require('helmet')())
    .use(
      require('compression')({
        level: 6,
        filter: () => true
      })
    )
    .use((req, res, next) => {
      if (!dev && !/localhost/.test(req.hostname) && !req.secure && req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(`https://${req.hostname}${req.url}`)
      }

      return next()
    })
    .use((req, res, next) => {
      if (req.url.endsWith('service-worker.js')) {
        return app.serveStatic(req, res, path.join(dir, `./.next/${req.url}`))
      } else if (/(robots\.txt)$/.test(req.url)) {
        return app.serveStatic(req, res, path.join(dir, `./static/${req.url}`))
      }

      return next()
    })

    .get('/', render('/index'))
    .get('/:slug', render('/report'))
    .get('*', (req, res) => handle(req, res))

    .listen(port, err => {
      if (err) {
        throw err
      }

      console.log(`🚀 ready on http://[::1]:${port} 🚀`)
    })
})
