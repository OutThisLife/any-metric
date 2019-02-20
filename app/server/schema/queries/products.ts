import { convertIds } from '../mutations'
import { Product, Resolver, Tag } from '../types'

export default (async (
  _,
  { paginationInput = { pageNumber: 1, entriesPerPage: 1 }, input = {} },
  { mongo }
): Promise<Product[]> => {
  const args = Object.assign({}, input, {
    status: {
      $ne: 'EndedWithoutSales'
    }
  })

  if ('tags' in args && '$in' in args.tags) {
    args.tags.$in = convertIds(args.tags.$in)
  }

  const tags = await mongo.tags.find<Tag>().toArray()

  return (await mongo.products
    .find<Product>(args)
    .skip(paginationInput.pageNumber)
    .limit(paginationInput.entriesPerPage)
    .toArray()).map(d => ({
    ...d,
    tags: (d.tags as any[])
      .map(t =>
        tags.find(tt => {
          if (typeof t === 'object' && 'equals' in t) {
            return t.equals(tt._id)
          }

          return t === tt._id.toString()
        })
      )
      .filter(t => t)
  }))
}) as Resolver

export const totalProducts = (async (_, __, { mongo }): Promise<number> =>
  await mongo.products.countDocuments()) as Resolver
