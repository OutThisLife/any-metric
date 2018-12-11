import { IResolvers } from 'graphql-tools'
import slugify from 'slugify'

import Mutation from './mutations'
import Query from './queries'
import { Context, Product, Tag } from './types'

const slug = async ({ title }: any) => slugify(title)

export default {
  Query,
  Mutation,

  JSON: require('graphql-type-json'),
  Date: require('graphql-iso-date').GraphQLDateTime,

  Tag: {
    slug,
    total: async ({ _id: tags }: Tag, _, { mongo }) =>
      mongo.collection('products').countDocuments({
        tags
      })
  },

  Product: {
    slug,
    tags: async ({ tags = [] }: Product, _, { mongo }) =>
      mongo
        .collection('tags')
        .find({
          _id: {
            $in: tags
          }
        })
        .toArray()
  }
} as IResolvers<{}, Context>
