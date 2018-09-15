import { ApolloServer } from 'apollo-server'
import express, { Request, Response } from 'express'
import next from 'next'
import path from 'path'

import { cache, resolvers, typeDefs } from './schema'

const dev = process.env.NODE_ENV !== 'production'

if (!dev && process.env.NEW_RELIC_HOME) {
  require('newrelic')
}

const dir = path.resolve(process.cwd(), 'app')
const port = process.env.PORT || 3000

const app = next({ dir, dev })
const handle = app.getRequestHandler()

// -----------------------------------------

const render = (page = '/') => (req: Request, res: Response) => {
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
  new ApolloServer({
    typeDefs,
    resolvers,
    context: { cache },
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
    .use((req, res, resolve) => {
      if (!dev && !req.secure && req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(`https://${req.hostname}${req.url}`)
      }

      return resolve()
    })
    .use((req, res, resolve) => {
      if (req.url.endsWith('service-worker.js')) {
        return app.serveStatic(req, res, path.join(dir, `./.next/${req.url}`))
      } else if (/(robots\.txt)$/.test(req.url)) {
        return app.serveStatic(req, res, path.join(dir, `./static/${req.url}`))
      }

      return resolve()
    })

    .get('/', render('/index'))
    .get('/:slug([A-z-]+)/:id([A-z0-9-]+)?', (req, res, resolve) => {
      if (req.params.slug === '_next') {
        return resolve()
      }

      return render('/index')(req, res)
    })
    .get('*', handle as any)

    .listen(port, err => {
      if (err) {
        throw err
      }

      console.log(`🚀 ready on http://[::1]:${port} 🚀`)
    })
})
