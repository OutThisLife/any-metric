import { IResolvers } from 'graphql-tools'
import slugify from 'slugify'

import Mutation from './mutations'
import Query from './queries'
import { Context, Resolver, Tag } from './types'

const slug: Resolver = async ({ title = '' }: any) => slugify(title)
const tags: Resolver = async (d, _, { mongo }) => {
  const result = await mongo.tags.find<Tag>().toArray()

  if (!result.length) {
    return []
  }

  return ((d.tags || []) as any[]).map(t =>
    result.find(tt => {
      if (typeof t === 'object' && 'equals' in t) {
        return t.equals(tt._id)
      }

      return t === tt._id.toString()
    })
  )
}

export default {
  Query,
  Mutation,
  JSON: require('graphql-type-json'),
  Date: require('graphql-iso-date').GraphQLDateTime,
  Tag: { slug },
  Product: { slug, tags },
  View: { tags }
} as IResolvers<{}, Context>
