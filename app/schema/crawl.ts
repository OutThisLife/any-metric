import md5 from 'md5'
import { parse } from 'url'
import x from 'x-ray'

import { context as cache } from '.'

interface Selector {
  name: string
  el: string
}

interface Args {
  url: string
  parent?: string
  children: Selector[]
}

export default async (_, { url, parent = 'html', children = [] }: Args) => {
  const XRay = x()
  const { hostname } = parse(url)

  const selectors = children.reduce((acc, { name, el }: Selector) => ((acc[name] = el), acc), {})
  const id = md5(`${url}${JSON.stringify(selectors)}`)

  if (!cache.has(id)) {
    const { err, title, meta, data } = await XRay(url, {
      title: 'title',
      meta: XRay('meta', [
        {
          name: '@name',
          description: '@content'
        }
      ]),
      data: XRay(parent, [selectors])
    })

    if (err) {
      console.error(err)
      throw err
    }

    cache.set(id, { id, title, meta, hostname, url, data })
  }

  return cache.get(id)
}
