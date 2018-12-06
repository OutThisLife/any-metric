import * as md5 from 'md5'
import { parse } from 'url'

import { getPage } from '../../../api'
import { CrawlResult, Resolver } from '../../types'

export const crawl: Resolver = async (
  _,
  {
    url,
    selectors = []
  }: {
    url: string
    selectors: string[]
  }
): Promise<CrawlResult> => c(url, selectors)

export const google: Resolver = async (
  _,
  { keywords }: { keywords: string }
): Promise<CrawlResult> =>
  c(`https://www.google.com/search?q=${encodeURIComponent(keywords)}`, [
    '.g a:first-child'
  ])

const c = async (url: string, selectors: string[]): Promise<CrawlResult> => {
  const page = await getPage(url)

  return new Promise<CrawlResult>(resolve =>
    page.run(async () => {
      const id = md5(`${url}${JSON.stringify(selectors)}`)
      const { hostname } = parse(url)

      const title = await page.title()
      const meta = await page.$eval('head > meta[name]', el => el.textContent)
      const data = await page.$eval(
        '[data-ved] a[ping] > h3',
        el => el.textContent
      )

      resolve({ id, hostname, url, title, meta, data })
    })
  )
}
