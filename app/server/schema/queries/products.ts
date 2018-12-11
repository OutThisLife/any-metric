import { Product, Resolver } from '../types'

export default (async (_, __, { mongo }): Promise<Product[]> => {
  const col = await mongo.collection('products')
  return col.find<Product>().toArray()
}) as Resolver
