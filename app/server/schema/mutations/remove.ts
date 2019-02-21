import { convertId, convertIds } from '.'
import { Resolver } from '../types'

export default (async (_, { objectId, collectionName }, { mongo }) => {
  if (/^all/i.test(collectionName)) {
    await mongo
      .collection(collectionName.split('all')[1].toLowerCase())
      .deleteMany({})

    const { result } = await mongo.products.deleteMany({})
    return result
  }

  if (/tags/i.test(collectionName)) {
    await mongo.products.deleteMany({
      tags: {
        $in: convertIds([objectId])
      }
    })
  }

  const { result } = await mongo
    .collection(collectionName)
    .deleteOne(convertId(objectId))

  return result
}) as Resolver
