import { Product, Resolver } from '../types'

export default (async (
  _,
  { input }: { input: Product },
  { mongo }
): Promise<Product> => {
  const col = await mongo.collection('products')
  const { insertedId } = await col.insertOne({
    bids: 0,
    createdAt: new Date(),
    image: '',
    isQuery: false,
    price: 0,
    qty: 0,
    shipping: 0,
    tags: [],
    url: '',
    ...input
  })

  return col.findOne<Product>({ _id: insertedId })
}) as Resolver
