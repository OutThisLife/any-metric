const next = require('next')
const express = require('express')
const LRUCache = require('lru-cache')
const path = require('path')
const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers, context } = require('./schema')

const dev = process.env.NODE_ENV !== 'production'

if (!dev) {
  require('newrelic')
}

const dir = path.resolve(process.cwd(), 'app')
const port = process.env.PORT || 3000

const app = next({ dir, dev })
const handle = app.getRequestHandler()

// -----------------------------------------

const render = (page = '/') => (req, res) => {
  const key = req.url

  if (!dev && context.cache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(context.cache.get(key))
    return
  }

  try {
    ;(async () => {
      const html = await app.renderToHTML(req, res, page, req.params)

      if (res.statusCode !== 200) {
        res.send(html)
        return
      }

      context.cache.set(key, html)

      res.setHeader('x-cache', 'MISS')
      res.send(html)
    })()
  } catch (err) {
    app.renderError(err, req, res, req.query)
  }
}

// -----------------------------------------

app.prepare().then(() => {
  new ApolloServer({
    typeDefs,
    resolvers,
    context,
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
      if (!dev && !req.secure && req.headers['x-forwarded-proto'] !== 'https') {
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
    .get('/:slug([A-z-]+)/:id([A-z0-9-]+)?', (req, res, next) => {
      if (req.params.slug === '_next') {
        next()
      } else {
        render('/index')(req, res)
      }
    })
    .get('*', (req, res) => handle(req, res))

    .listen(port, err => {
      if (err) {
        throw err
      }

      console.log(`🚀 ready on http://[::1]:${port} 🚀`)
    })
})
