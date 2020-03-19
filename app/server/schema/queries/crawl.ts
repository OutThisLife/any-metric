import * as mongoose from 'mongoose'
import { parse } from 'url'

import { getPage } from '../../api'
import { CrawlResult, Resolver } from '../types'

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
  { keywords, news }: { keywords: string; news: boolean }
): Promise<CrawlResult> => {
  const url = `https://www.google.com/search?q=${encodeURIComponent(keywords)}`

  if (news) {
    return c(`${url}&tbm=nws&tbs=sbd:1`, '[data-async-context] > div', [
      {
        key: 'title',
        selector: '[role="heading"]'
      },
      {
        key: 'desc',
        selector: '[role="heading"] + div'
      },
      {
        key: 'url',
        selector: '[href]'
      }
    ])
  }

  return c(url, '.g', [
    {
      key: 'title',
      selector: 'h3'
    }
  ])
}

const c = async (
  url: string,
  parent: string,
  selectors: Selector[]
): Promise<CrawlResult> => {
  const page = await getPage(url)

  return new Promise<CrawlResult>(resolve =>
    page.run(async () => {
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

          try {
            r[key] = await page.$eval(
              `${parent}:nth-of-type(${i + 1}) ${selector}`,
              el =>
                el.hasAttribute('href')
                  ? el.getAttribute('href')
                  : el.textContent
            )
          } catch (err) {
            console.warn(err)
          }

          return acc
        }, Promise.resolve({}))
      }

      resolve({
        _id: new mongoose.mongo.ObjectID(url.substr(0, 12)).toHexString(),
        hostname,
        url,
        title,
        meta,
        data: data.filter(i => i)
      })
    })
  )
}

interface Selector {
  key: string
  selector: string
}
