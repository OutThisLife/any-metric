import { Item } from '@types'
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
    history: (_, __, ctx) => ctx.cache.values().filter(o => o.id)
  },
  Result: {
    data: ({ data }: Item, { limit }) => data.slice(0, limit)
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
    hostname: String
    url: String
    meta: JSON
    data(limit: Int): JSON
  }

  type SearchResult {
    id: ID @isUnique
    title: String
    hostname: String
    url: String
    meta: JSON
  }

  type Query {
    crawl(url: String!, parent: String!, children: [Selector]!): Result
    search(q: String!): SearchResult
    history: [Result]
  }
`
