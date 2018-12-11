import { ObjectId } from 'bson'

import { Resolver } from '../types'

export default (async (_, { input: { id } }, { mongo }) => {
  const col = await mongo.collection('tags')
  const res = await col.deleteOne({ _id: new ObjectId(id) })
  return res.deletedCount === 1
}) as Resolver
