import { Resolver } from '../types'

export default (async (_, { input: { tag: title } }, { mongo }) => {
  const col = await mongo.collection('tags')
  const cur = await col.findOne({ title })

  if (cur && '_id' in cur) {
    return cur
  }

  const res = await col.insertOne({
    title,
    createdAt: new Date()
  })

  return res.ops[0]
}) as Resolver
