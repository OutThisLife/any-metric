import * as mongoose from 'mongoose'

import { Resolver } from '../types'

export default (async (_, { input: { id } }, { mongo }) => {
  const col = await mongo.collection('tags')
  const res = await col.deleteOne({ _id: new mongoose.mongo.ObjectID(id) })
  return res.deletedCount === 1
}) as Resolver
