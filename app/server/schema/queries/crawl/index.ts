import * as md5 from 'md5'
import { parse } from 'url'

import { getPage } from '../../../api'
import { Resolver, Result } from '../../types'

export default (async (_, { url, selectors = [] }: Args): Promise<Result> => {
  const page = await getPage(url)

  return page.run(
    async (): Promise<Result> => {
      const id = md5(`${url}${JSON.stringify(selectors)}`)
      const { hostname } = parse(url)

      try {
        const title = await page.title()
        const meta = await page.$eval('head > meta[name]', el => el.textContent)
        const data = await page.$eval('div', el => el.textContent)

        return { id, hostname, url, title, meta, data }
      } catch (err) {
        throw err
      }
    }
  )
}) as Resolver

interface Args {
  url: string
  selectors?: string[]
}
