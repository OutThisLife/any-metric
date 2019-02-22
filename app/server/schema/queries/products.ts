import { convertIds } from '../mutations'
import { Product, Resolver } from '../types'

export default (async (
  _,
  { paginationInput = { pageNumber: 0, entriesPerPage: 1 }, input = {} },
  { mongo }
): Promise<Product[]> => {
  const args = Object.assign({}, input, {
    status: {
      $ne: 'EndedWithoutSales'
    }
  })

  if ('tags' in args && '$in' in args.tags) {
    args.tags.$in = convertIds(args.tags.$in)
  } else if (!('tags' in args)) {
    args.tags = {
      $exists: true,
      $not: { $size: 0 }
    }
  }

  return await mongo.products
    .find<Product>(args)
    .skip(paginationInput.pageNumber)
    .limit(paginationInput.entriesPerPage)
    .toArray()
}) as Resolver

export const totalProducts = (async (_, __, { mongo }): Promise<number> =>
  await mongo.products.countDocuments()) as Resolver
