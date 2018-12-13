import { Product, Resolver } from '../types'

export default (async (_, __, { mongo }): Promise<Product[]> =>
  mongo
    .collection('products')
    .find<Product>({
      isDeleted: {
        $ne: true
      }
    })
    .toArray()) as Resolver
