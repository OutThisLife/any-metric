import { convertId } from '../mutations'
import { Resolver, View } from '../types'

export default (async (_, { objectId, input }, { mongo }): Promise<View> => {
  const entry = await mongo.view.findOne(objectId ? convertId(objectId) : input)

  if (entry === null) {
    const { insertedId } = await mongo.view.insertOne({
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...input
    })

    return mongo.view.findOne({ _id: insertedId })
  }

  return entry
}) as Resolver
