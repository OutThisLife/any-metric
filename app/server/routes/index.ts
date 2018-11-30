import * as express from 'express'
import * as LRU from 'lru-cache'
import * as next from 'next'

const router = express.Router()

module.exports = ({
  nextApp,
  cache,
  dev
}: {
  nextApp: next.Server
  cache: LRU.Cache<any, any>
  dev?: boolean
}) => {
  const render = (page = '/') => (
    req: express.Request,
    res: express.Response
  ) => {
    const key = req.url

    if (!dev && cache.has(key)) {
      res.setHeader('x-cache', 'HIT')
      res.send(cache.get(key))
      return
    }

    try {
      ;(async () => {
        const html = await nextApp.renderToHTML(req, res, page, req.params)

        if (res.statusCode !== 200) {
          res.send(html)
          return
        }

        cache.set(key, html)

        res.setHeader('x-cache', 'MISS')
        res.send(html)
      })()
    } catch (err) {
      nextApp.renderError(err, req, res, req.query)
    }
  }

  router.get('/', render('/Dashboard'))

  return router
}
