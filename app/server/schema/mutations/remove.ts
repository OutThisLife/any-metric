import { convertId } from '.'
import { Resolver, Tag } from '../types'

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

    if (collectionName === 'tags') {
      const tag = await mongo.collection('tags').findOne<Tag>(q)

      if (tag.isQuery && tag.isDeleted) {
        await mongo.collection('products').updateMany(
          {
            tags: {
              $in: [tag._id]
            }
          },
          {
            $set: {
              isDeleted: true,
              deletedAt: new Date()
            },

            $pull: {
              tags: [tag._id]
            }
          }
        )
      }
    }

    return result
  }
}

export default rm(() => ({ isDeleted: true, deletedAt: new Date() }))
export const undo = rm(() => ({ isDeleted: false, restoredAt: new Date() }))
