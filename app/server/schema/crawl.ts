import { IObject, Item } from '@types'
import * as md5 from 'md5'
import { parse } from 'url'
import * as XRay from 'x-ray'

import { cache } from '.'

interface Selector {
  name: string
  el: string
}

interface Args {
  url: string
  parent?: string
  children?: Selector[]
}

export default async (_, { url, parent = 'html', children = [] }: Args): Promise<Item> => {
  const x = XRay()
  const { hostname } = parse(url)

  const selectors: IObject = children.reduce((acc, { name, el }: Selector) => ((acc[name] = el), acc), {})
  const id = md5(`${url}${JSON.stringify(selectors)}`)

  if (!cache.has(id)) {
    const { err, title, meta, data } = await x(url, {
      title: 'title',
      meta: x('meta', [
        {
          name: '@name',
          description: '@content'
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

  return cache.get(id) as Item
}
