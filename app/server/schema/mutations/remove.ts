import { convertId } from '.'
import { Resolver, Tag } from '../types'

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
    const q = objectId ? convertId(objectId) : input

    const { result } = await mongo.collection(collectionName).updateOne(q, {
      $set: {
        isDeleted: true,
        deletedAt: new Date()
      }
    })

    if (collectionName === 'tags') {
      const tag = await mongo.tags.findOne<Tag>(
        Object.assign({}, q, {
          isQuery: true,
          isDeleted: true
        })
      )

      if (tag) {
        await mongo.products.updateMany(
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
}) as Resolver
