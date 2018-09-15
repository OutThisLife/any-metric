import { gql } from 'apollo-server-express'
import GraphQLJSON from 'graphql-type-json'
import LRUCache from 'lru-cache'

export const cache = new LRUCache({
  max: 152,
  maxAge: 36e2
})

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

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    crawl: require('./crawl'),
    search: require('./search'),
    history: (_, __, ctx) => ctx.cache.values().filter(o => o.id)
  },
  Result: {
    data: ({ data }, { limit }) => data.slice(0, limit)
  }
}
