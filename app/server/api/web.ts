import * as puppeteer from 'puppeteer'

export const getPage = async (url: string): Promise<GetPage> => {
  try {
    const browser = await puppeteer.launch({
      headless: true
    })

    const page = (await browser.newPage()) as GetPage

    page.run = async (cb = async () => null) => {
      await page.goto(url, { waitUntil: 'networkidle2' })
      await cb()
      await browser.close()
    }

    return page
  } catch (err) {
    console.error(err)
    throw err
  }
}

interface GetPage extends puppeteer.Page {
  run?: (cb?: () => Promise<any>) => Promise<any>
}
