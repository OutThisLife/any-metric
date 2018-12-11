import { Resolver, Tag } from '../types'

export default (async (_, __, { mongo }): Promise<Tag[]> => {
  const col = await mongo.collection('tags')
  return col.find<Tag>().toArray()
}) as Resolver
