import { convertId } from '.'
import { Resolver } from '../types'

const rm = (input: () => { [key: string]: any }): Resolver => async (
  _,
  { objectId, collectionName },
  { mongo }
) => {
  const { result } = await mongo
    .collection(collectionName)
    .updateOne(convertId(objectId), {
      $set: {
        ...input(),
        updatedAt: new Date()
      }
    })

  return result
}

export default rm(() => ({ isDeleted: true, deletedAt: new Date() }))
export const undo = rm(() => ({ isDeleted: false, restoredAt: new Date() }))
