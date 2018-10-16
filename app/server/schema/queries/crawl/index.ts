import { IFieldResolver } from 'graphql-tools'
import * as md5 from 'md5'
import { parse } from 'url'
import * as XRay from 'x-ray'

import { Context, Result } from '../../types'

export interface Selector {
  parent?: string
  name: string
  el: string
}

interface Args {
  url: string
  parent?: string
  children?: Selector[]
}

export default (async (
  _,
  { url, parent = 'html', children = [] }: Args
): Promise<Result> => {
  const x = XRay()
  const { hostname } = parse(url)

  const selectors = children.reduce(
    (acc, { name, el }: Selector) => ((acc[name] = el), acc),
    {}
  )

  const id = md5(`${url}${JSON.stringify(selectors)}`)

  const { err, title, meta, data }: Result = await x(url, {
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

  return { id, title, meta, hostname, url, data }
}) as IFieldResolver<{}, Context>
