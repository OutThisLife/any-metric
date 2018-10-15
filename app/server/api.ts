import * as core from 'express-serve-static-core'
import * as puppeteer from 'puppeteer'

import { cache } from '.'

module.exports = {
  applyMiddleware: (app: core.Express) => {
    app
      .get(
        '/screenshot/:site',
        async (
          {
            params: { site = 'example.com' },
            query: {
              w: width = 1000,
              h: height = 600,
              q: quality = 40,
              schema = 'https'
            }
          },
          res
        ) => {
          const key = `screenshot-${site}`
          const url = `${schema}://${site}`

          if (!cache.has(key)) {
            try {
              const browser = await puppeteer.launch()
              const page = await browser.newPage()

              page.setViewport({ width, height, deviceScaleFactor: 1 })
              await page.goto(url, {
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
              console.error(err)
              res.end(err)
            }
          }

          res.writeHead(200, { 'Content-Type': 'image/jpeg' })
          res.end(cache.get(key))
        }
      )
      .get(
        '/iframe/:site',
        async (
          { params: { site = 'example.com' }, query: { schema = 'https' } },
          res
        ) => {
          const fetch = require('isomorphic-unfetch')
          const url = `${schema}://${site}`

          try {
            const buf = await (await fetch(url)).blob()
            res.send(buf)
          } catch (err) {
            console.error(err)
            res.end(err)
          }
        }
      )
  }
}
