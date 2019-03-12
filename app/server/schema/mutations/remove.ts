import { convertId } from '.'
import { Resolver } from '../types'

export default (async (_, { objectId, collectionName }, { mongo }) => {
  if (/all/i.test(collectionName)) {
    const { result: r1 } = await mongo.tags.deleteMany({})
    const { result: r2 } = await mongo.view.deleteMany({})
    const { result: r3 } = await mongo.products.deleteMany({})

    return {
      ok: true,
      n: [r1, r2, r3].reduce((acc, r) => (acc += r.n), 0)
    }
  } else if (objectId) {
    const { result } = await mongo
      .collection(collectionName)
      .deleteOne(convertId(objectId))

    return result
  } else {
    const { result } = await mongo.collection(collectionName).deleteMany({})
    return result
  }
}) as Resolver
