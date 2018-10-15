import * as express from 'express'
import * as path from 'path'

import { cache, dev, dir, nextApp } from '.'

const router = express.Router()

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

router.use((req, res, resolve) => {
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

router.get('/', render('/index'))

router.get('/:slug([A-z-]+)/:id([A-z0-9-]+)?', (req, res, resolve) => {
  if (req.params.slug === '_next') {
    return resolve()
  }

  return render('/index')(req, res)
})

module.exports = router
