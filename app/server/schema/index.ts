import { GraphQLDateTime } from 'graphql-iso-date'
import { IResolvers } from 'graphql-tools'
import * as GraphQLJSON from 'graphql-type-json'

import { setLayout, setTags } from './mutations'
import { crawl, fakeCrawl, layout, search } from './queries'
import { Context, Result } from './types'

export { crawl, layout, search, setLayout }
export { default as typeDefs } from './types'
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
  },

  CrawlResult: {
    data: ({ data }: Result, { limit }: { limit?: number }) =>
      data.slice(0, limit)
  }
} as IResolvers<{}, Context>
