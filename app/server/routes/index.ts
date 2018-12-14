import * as express from 'express'
import * as mime from 'mime'
import { URL } from 'url'

import { getPage } from '../api'

const router = express.Router()

module.exports = ({ nextApp, cache, dev }) => {
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

  router.get('/:category?', render('/Dashboard'))

  router.get(
    '/screenshot',
    async (
      { query: { url, w: width = 1000, h: height = 600, q: quality = 40 } },
      res
    ) => {
      const page = await getPage(url)
      page.setViewport({ width, height, deviceScaleFactor: 1 })

      await page.run(async () => {
        const out = await page.screenshot({
          quality,
          type: 'jpeg',
          clip: { x: 0, y: 0, width, height }
        })

        res.type('image/jpeg')
        res.end(out)
      })
    }
  )

  router.get('/render', async ({ query: { url } }, res) => {
    const page = await getPage(url)
    const type = mime.getType(url.split('?')[0]) || 'text/html'

    page.on('response', async pageRes => {
      const buf = await pageRes.buffer()

      res.type(type)

      if (type === 'text/html') {
        return res.send(
          buf
            .toString()
            .replace(/\s+(href|src)=['"](.*?)['"]/g, (_, p1, p2) => {
              let newUrl = ''

              if (p2.indexOf('http') !== -1) {
                newUrl = p2
              } else if (p2.substr(0, 2) === '//') {
                newUrl = `http:${p2}`
              } else {
                const searchURL = new URL(url)
                newUrl = `${searchURL.protocol}//${searchURL.host}${p2}`
              }

              return ` ${p1}="http://localhost:3000/render?url=${newUrl}"`
            })
        )
      }

      return res.send(buf)
    })

    await page.run()
  })

  return router
}
