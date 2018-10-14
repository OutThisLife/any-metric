import { IFieldResolver } from 'graphql-tools'
import * as md5 from 'md5'
import { parse } from 'url'

import { crawl } from '../'
import { cache } from '../..'
import { Context, Result } from '../types'

export default (async (_, { q }: { q: string }): Promise<Result> => {
  const id = md5(`gsearch-${q}`)

  if (!cache.has(id)) {
    const res = await crawl(
      null,
      {
        url: `https://www.google.com/search?q=${encodeURIComponent(q)}`,
        parent: '.g',
        children: [{ name: 'url', el: 'a:first-child@href' }]
      },
      null,
      null
    )

    const { href, hostname } = parse(res.data[0].url.split('?q=')[1])
    const url = href.split('&')[0]
    const { err, title, meta } = await crawl(null, { url }, null, null)

    if (err) {
      console.error(err)
      throw err
    }

    cache.set(id, { id, title, meta, hostname, url })
  }

  return cache.get(id) as Result
}) as IFieldResolver<{}, Context>
