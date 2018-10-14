import * as core from 'express-serve-static-core'
import * as puppeteer from 'puppeteer'

import { cache } from '.'

module.exports = {
  applyMiddleware: (app: core.Express) => {
    app.get(
      '/screenshot/:site',
      async ({ params: { site = 'example.com' } }, res) => {
        const key = `screenshot-${site}`

        if (!cache.has(key)) {
          const browser = await puppeteer.launch()
          const page = await browser.newPage()

          page.setViewport({ width: 1000, height: 600, deviceScaleFactor: 1 })
          await page.goto(`https://${site}`, { waitUntil: 'networkidle0' })

          const out = await page.screenshot({
            type: 'jpeg',
            quality: 40,
            clip: { x: 0, y: 0, width: 1000, height: 600 }
          })

          await browser.close()
          cache.set(key, out)
        }

        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
        res.end(cache.get(key))
      }
    )
  }
}
