import { IResolvers } from 'graphql-tools'
import slugify from 'slugify'

import Mutation, { convertIds } from './mutations'
import Query from './queries'
import { Context, Product, Tag } from './types'

const slug = async ({ title }: any) => slugify(title)

export default {
  Query,
  Mutation,

  JSON: require('graphql-type-json'),
  Date: require('graphql-iso-date').GraphQLDateTime,

  T: {
    __resolveType: async o => ('tags' in o ? 'Product' : 'Tag')
  },

  Tag: {
    slug,
    total: async ({ _id: tags }: Tag, _, { mongo }) =>
      mongo.collection('products').countDocuments({
        tags
      })
  },

  Product: {
    slug,
    tags: async ({ tags }: Product, _, { mongo }) =>
      mongo
        .collection('tags')
        .find({
          _id: {
            $in: convertIds(tags as string[])
          }
        })
        .toArray()
  }
} as IResolvers<{}, Context>
