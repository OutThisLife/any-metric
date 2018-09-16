import * as md5 from 'md5'
import { parse } from 'url'
import * as XRay from 'x-ray'

import { cache } from '.'

interface Args {
  url: string
  parent?: string
  children?: Baph.Selector[]
}

export default async (_, { url, parent = 'html', children = [] }: Args): Promise<Baph.Result> => {
  const x = XRay()
  const { hostname } = parse(url)

  const selectors = children.reduce((acc, { name, el }: Baph.Selector) => ((acc[name] = el), acc), {})
  const id = md5(`${url}${JSON.stringify(selectors)}`)

  if (!cache.has(id)) {
    const { err, title, meta, data }: Baph.Result = await x(url, {
      title: 'title',
      img: 'img:first-child@src',
      meta: x('meta', [
        {
          name: '@name',
          content: '@content'
        },
        {
          name: '@property',
          content: '@content'
        }
      ]),
      data: x(parent, [selectors])
    })

    if (err) {
      console.error(err)
      throw err
    }

    cache.set(id, { id, title, meta, hostname, url, data })
  }

  return cache.get(id) as Baph.Result
}
