import { convertId } from '.'
import { Resolver } from '../types'

export default (async (
  _,
  { objectId, collectionName, input = {} },
  { mongo }
) => {
  if (/^all/i.test(collectionName)) {
    const { result } = await mongo
      .collection(collectionName.split('all')[1].toLowerCase())
      .deleteMany({})

    return result
  } else {
    const { result } = await mongo
      .collection(collectionName)
      .deleteMany(objectId ? convertId(objectId) : input)

    if (collectionName === 'tags') {
      await mongo.products.deleteMany({
        tags: {
          $in: [objectId]
        }
      })
    }

    return result
  }
}) as Resolver
