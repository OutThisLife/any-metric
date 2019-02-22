import { convertId } from '.'
import { Resolver } from '../types'

export default (async (_, { objectId, collectionName, input }, { mongo }) => {
  const { result } = await mongo
    .collection(collectionName)
    .updateOne(convertId(objectId), {
      $set: {
        updatedAt: new Date()
      },
      ...input
    })

  return result
}) as Resolver
