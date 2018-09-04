import parser from 'body-parser'
import compression from 'compression'
import express from 'express'
import next from 'next'
import Xray from 'x-ray'

require('dotenv').config()

const env = process.env
const port = env.PORT || 3000
const dev = env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()
const x = Xray()

app.prepare().then(() => {
  express()
    .use(parser.json())
    .use(compression())

    .get('/:slug', (req, res) => app.render(req, res, req.params))
    .post('/crawl', (req, res, next) => {
      const { url, selectors } = req.body
      const { parent, ...children } = selectors

      x(url, { items: x(parent, [children]) })((err, obj) => {
        if (err) {
          res.status(500).send(err)
        }

        res.json(obj)
      })
    })

    .use((req, res) => handle(req, res))
    .listen(port, () => console.log(`Listening on port ${port}`))
})
