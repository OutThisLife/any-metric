import * as md5 from 'md5'
import { parse } from 'url'

import { cache, crawl } from '.'

interface Args {
  q: string
}

export default async (_, { q }: Args) => {
  const id = md5(`gsearch-${q}`)

  if (!cache.has(id)) {
    const res = await crawl(null, {
      url: `https://www.google.com/search?q=${encodeURIComponent(q)}`,
      parent: '.g',
      children: [{ name: 'url', el: 'a:first-child@href' }]
    })

    try {
      const { href, hostname } = parse(res.data[0].url.split('?q=')[1])
      const url = href.split('&')[0]
      const { title, meta } = await crawl(null, { url })

      cache.set(id, { id, title, meta, hostname, url })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return cache.get(id)
}
