import { MongoEntry, Resolver } from '../types'

export default <T extends MongoEntry>({
  collectionName = 'products',
  defaultValues = {}
}): Resolver => async (_, { input }, { mongo }): Promise<T> => {
  const col = await mongo.collection(collectionName)
  const entry = await col.findOne<T>({ title: input.title })

  if (entry === null) {
    const { insertedId } = await col.insertOne({
      ...defaultValues,
      ...input,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return col.findOne<T>({ _id: insertedId })
  } else {
    await col.updateOne(
      { _id: entry._id },
      {
        $set: {
          updatedAt: new Date(),
          isDeleted: false
        }
      }
    )
  }

  return entry
}
