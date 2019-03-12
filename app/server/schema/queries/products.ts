import { convertIds } from '../mutations'
import { Product, Resolver } from '../types'

export default (async (
  _,
  { paginationInput = { pageNumber: 0, entriesPerPage: 1 }, input = {} },
  { mongo }
): Promise<Product[]> => {
  if (!('status' in input)) {
    input.status = {
      $ne: 'EndedWithoutSales'
    }
  }

  if ('tags' in input && '$in' in input.tags) {
    input.tags.$in = convertIds(input.tags.$in)
  } else if (!('tags' in input)) {
    input.tags = {
      $exists: true,
      $not: { $size: 0 }
    }
  }

  return await mongo.products
    .find<Product>(input)
    .skip(
      Math.ceil(
        (paginationInput.pageNumber - 1) * paginationInput.entriesPerPage
      )
    )
    .limit(paginationInput.entriesPerPage)
    .toArray()
}) as Resolver

export const totalProducts = (async (_, __, { mongo }): Promise<number> =>
  await mongo.products.countDocuments()) as Resolver
