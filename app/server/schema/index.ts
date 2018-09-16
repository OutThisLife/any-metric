import { gql, IResolvers } from 'apollo-server-express'
import * as JSON from 'graphql-type-json'
import * as LRU from 'lru-cache'

import crawl from './crawl'
import search from './search'

export { crawl, search }

export const cache = LRU({
  max: 152,
  maxAge: 36e2
})

export const resolvers: IResolvers = {
  JSON,
  Query: {
    crawl,
    search,
    history: (_, __, ctx): Baph.Result[] => ctx.cache.values().filter(o => o.id)
  },
  Result: {
    data: ({ data }: Baph.Result, { limit }: { limit?: number }) => data.slice(0, limit)
  }
}

export const typeDefs = gql`
  scalar JSON

  input Selector {
    parent: String
    name: String
    el: String
  }

  type Result {
    id: ID @isUnique
    title: String
    img: String
    url: String
    hostname: String
    meta: JSON
    data(limit: Int): JSON
  }

  type Query {
    crawl(url: String!, parent: String!, children: [Selector]!): Result
    search(q: String!): Result
    history: [Result]
  }
`
