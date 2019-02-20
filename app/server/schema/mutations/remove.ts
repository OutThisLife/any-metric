import { convertId } from '.'
import { Resolver } from '../types'

export default (async (
  _,
  { objectId, collectionName, input = {} },
  { mongo }
) => {
  if (/^all/i.test(collectionName)) {
    await mongo
      .collection(collectionName.split('all')[1].toLowerCase())
      .deleteMany({})

    const { result } = await mongo.products.deleteMany({})

    return result
  } else {
    const { result } = await mongo
      .collection(collectionName)
      .deleteMany(objectId ? convertId(objectId) : input)

    if (/tags/i.test(collectionName)) {
      await mongo.products.deleteMany({
        tags: {
          $in: [convertId(objectId)]
        }
      })
    }

    return result
  }
}) as Resolver
