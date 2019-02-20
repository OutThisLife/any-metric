import { Resolver, Tag } from '../types'

export default (async (_, __, { mongo }): Promise<Tag[]> =>
  mongo.tags.find<Tag>().toArray()) as Resolver

export const totalTags = (async (_, __, { mongo }): Promise<number> =>
  await mongo.tags.countDocuments()) as Resolver
