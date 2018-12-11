import { Resolver } from '../types'

export default (async (_, { input = { title: '' } }, { mongo }) => {
  const col = await mongo.collection('products')

  const values = Object.assign(input, {
    createdAt: new Date(),
    image: '',
    tags: [],
    price: 0,
    shipping: 0,
    qty: 0,
    bids: 0
  })

  const cur = await col.findOne({ title: input.title })

  if (cur && '_id' in cur) {
    return cur
  }

  const res = await col.insertOne(values)
  return res.ops[0]
}) as Resolver
