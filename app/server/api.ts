import * as core from 'express-serve-static-core'
import * as puppeteer from 'puppeteer'

import { cache } from '.'

module.exports = {
  applyMiddleware: (app: core.Express) => {
    app.get(
      '/screenshot/:site',
      async (
        {
          query: {
            w: width = 1000,
            h: height = 600,
            q: quality = 40,
            ssl = true
          },
          params: { site = 'example.com' }
        },
        res
      ) => {
        const key = `screenshot-${site}`

        if (!cache.has(key)) {
          try {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()

            page.setViewport({ width, height, deviceScaleFactor: 1 })
            await page.goto(`http${ssl ? 's' : ''}://${site}`, {
              waitUntil: 'networkidle0'
            })

            const out = await page.screenshot({
              quality,
              type: 'jpeg',
              clip: { x: 0, y: 0, width, height }
            })

            await browser.close()
            cache.set(key, out)
          } catch (err) {
            res.status(500)
            res.send(err)
          }
        }

        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
        res.end(cache.get(key))
      }
    )
  }
}
