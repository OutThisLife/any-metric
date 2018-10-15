import * as express from 'express'
import * as mime from 'mime'
import * as puppeteer from 'puppeteer'
import { URL } from 'url'

const router = express.Router()

const getPage = async (
  url: string
): Promise<puppeteer.Page & { run?: (cb?: () => void) => Promise<{}> }> => {
  try {
    const browser = await puppeteer.launch({
      headless: true
    })

    const page = await browser.newPage()

    Object.defineProperty(page, 'run', {
      value: async (cb = async () => 1) => {
        await page.goto(url, { waitUntil: 'networkidle2' })
        await cb()
        await browser.close()
      }
    })

    return page
  } catch (err) {
    console.error(err)
    throw err
  }
}

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
        buf.toString().replace(/\s+(href|src)=['"](.*?)['"]/g, (_, p1, p2) => {
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

module.exports = router
