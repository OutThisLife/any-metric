import { convertId } from '.'
import { Product, Resolver, Tag } from '../types'

export default (async (
  _,
  { objectId, collectionName, input },
  { mongo }
): Promise<Product | Tag> => {
  const q = convertId(objectId)

  const col = await mongo.collection(collectionName)
  await col.updateOne(q, {
    ...input,
    $set: {
      updatedAt: new Date()
    }
  })

  return col.findOne<Product | Tag>(q)
}) as Resolver