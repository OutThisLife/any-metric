import { Resolver, Tag } from '../types'

export default (async (
  _,
  { input }: { input: Tag },
  { mongo }
): Promise<Tag> => {
  const col = await mongo.collection('tags')

  const { insertedId } = await col.insertOne({
    createdAt: new Date(),
    isQuery: false,
    total: 0,
    ...input
  })

  return col.findOne<Tag>({ _id: insertedId })
}) as Resolver
