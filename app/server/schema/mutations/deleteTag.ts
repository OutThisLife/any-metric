import * as mongoose from 'mongoose'

import { Resolver } from '../types'

export default (async (_, { input: { id } }, { mongo }) => {
  const tagId = new mongoose.mongo.ObjectID(id)

  await mongo.collection('tags').deleteOne({ _id: tagId })
  await mongo.collection('products').updateMany(
    { tags: tagId },
    {
      $pull: { tags: tagId }
    }
  )

  return true
}) as Resolver
