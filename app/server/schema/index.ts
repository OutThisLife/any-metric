import { GraphQLDateTime } from 'graphql-iso-date'
import { IResolvers } from 'graphql-tools'
import * as GraphQLJSON from 'graphql-type-json'

import { setLayout, setTags } from './mutations'
import { crawl, fakeCrawl, layout, search } from './queries'
import { Context } from './types'

export { crawl, layout, search, setLayout }
export { typeDefs } from './types'
export { default as context } from './context'

export default {
  JSON: GraphQLJSON,
  Date: GraphQLDateTime,

  Query: {
    crawl,
    search,
    layout,
    fakeCrawl
  },

  Mutation: {
    setLayout,
    setTags
  }
} as IResolvers<{}, Context>
