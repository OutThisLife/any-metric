import { Resolver, Tag } from '../types'

export default (async (_, __, { mongo }): Promise<Tag[]> =>
  mongo.tags.find<Tag>().toArray()) as Resolver
