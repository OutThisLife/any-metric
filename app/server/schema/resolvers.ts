import { IResolvers } from 'graphql-tools'
import slugify from 'slugify'

import Mutation from './mutations'
import Query from './queries'
import { Context } from './types'

const slug = async ({ title }: any) => slugify(title)

export default {
  Query,
  Mutation,
  JSON: require('graphql-type-json'),
  Date: require('graphql-iso-date').GraphQLDateTime,
  T: { __resolveType: async o => ('tags' in o ? 'Product' : 'Tag') },
  Tag: { slug },
  Product: { slug }
} as IResolvers<{}, Context>
