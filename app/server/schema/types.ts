import gql from 'graphql-tag'
import { IFieldResolver } from 'graphql-tools'
import * as LRU from 'lru-cache'

export default gql`
  scalar JSON
  scalar Date

  type Query {
    fakeCrawl(id: [String]): [FakeResult]
  }

  type Mutation {
    setTags(ids: [String]!, tags: [String]!): [FakeResult]
  }

  input Selector {
    parent: String
    name: String
    el: String
  }

  type CrawlResult @cacheControl(maxAge: 10e5) {
    id: ID!
    title: String
    img: String
    date: Date
    url: String
    hostname: String
    meta: JSON
    data: JSON
    tags: [String]
  }

  type FakeResult @cacheControl(maxAge: 10e5) {
    id: ID!
    slug: String
    image: String
    title: String
    price: String
    shipping: String
    quantity: String
    bids: String
    copy: String
    date: Date
    tags: [String]
  }
`

export interface Result {
  __typename?: string
  id: string
  err?: string
  title?: string
  img?: string
  url?: string
  date?: Date
  hostname?: string
  meta?: any
  data?: any
  tags?: string[]
}

export interface FakeResult {
  __typename?: string
  id: string
  slug?: string
  image?: string
  title?: string
  price?: string
  shipping?: string
  quantity?: string
  bids?: string
  copy?: string
  date?: Date
  tags?: string[]
}

export interface Context<Cache = LRU.Cache<string, FakeResult[]>> {
  cache: Cache
}

export type Resolver = IFieldResolver<any, Context>
