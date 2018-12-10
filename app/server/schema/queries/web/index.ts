import * as md5 from 'md5'
import { parse } from 'url'

import { getPage } from '../../../api'
import { CrawlResult, Resolver } from '../../types'

export const crawl: Resolver = async (
  _,
  {
    url,
    parent = 'body',
    selectors = []
  }: {
    url: string
    parent: string
    selectors: Selector[]
  }
): Promise<CrawlResult> => c(url, parent, selectors)

export const google: Resolver = async (
  _,
  { keywords }: { keywords: string }
): Promise<CrawlResult> =>
  c(`https://www.google.com/search?q=${encodeURIComponent(keywords)}`, 'body', [
    {
      key: 'title',
      selector: 'h3'
    }
  ])

const c = async (
  url: string,
  parent: string,
  selectors: Selector[]
): Promise<CrawlResult> => {
  const page = await getPage(url)

  return new Promise<CrawlResult>(resolve =>
    page.run(async () => {
      const id = md5(`${url}${JSON.stringify(selectors)}`)
      const { hostname } = parse(url)

      const title = await page.title()
      const meta = await page.$$eval('head > meta[name]', tags =>
        tags.map(t => ({
          name: t.getAttribute('name'),
          value: t.getAttribute('content')
        }))
      )

      const data = []
      const len = await page.$$eval(parent, p => p.length)

      for (let i = 0; i < len; i++) {
        data[i] = await selectors.reduce(async (acc, { key, selector }) => {
          const r = await acc

          r[key] = await page.$eval(
            `${parent}:nth-of-type(${i + 1}) ${selector}`,
            el => el.textContent
          )

          return acc
        }, Promise.resolve({}))
      }

      resolve({ _id: id, hostname, url, title, meta, data })
    })
  )
}

interface Selector {
  key: string
  selector: string
}
