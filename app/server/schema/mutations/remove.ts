import { convertId } from '.'
import { Resolver } from '../types'

const rm = (input: () => { [key: string]: any }): Resolver => async (
  _,
  { objectId, collectionName },
  { mongo }
) => {
  if (/^all/i.test(collectionName)) {
    const { result } = await mongo
      .collection(collectionName.split('all')[1].toLowerCase())
      .deleteMany({})

    return result
  } else {
    const q = convertId(objectId)

    const { result } = await mongo.collection(collectionName).updateOne(q, {
      $set: {
        ...input(),
        updatedAt: new Date()
      }
    })

    return result
  }
}

export default rm(() => ({ isDeleted: true, deletedAt: new Date() }))
export const undo = rm(() => ({ isDeleted: false, restoredAt: new Date() }))
