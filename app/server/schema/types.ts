import gql from 'graphql-tag'
import { IFieldResolver } from 'graphql-tools'
import * as LRU from 'lru-cache'

export default gql`
  scalar JSON
  scalar Date

  type Query {
    fakeCrawl(id: [String]): [FakeCrawlResult]
  }

  type Mutation {
    setTags(ids: [String]!, tags: [String]!): [FakeCrawlResult]
  }

  input Selector {
    parent: String
    name: String
    el: String
  }

  type CrawlResult {
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

  type FakeCrawlResult {
    id: ID!
    slug: String
    image: String
    title: String
    price: String
    shipping: String
    quantity: String
    copy: String
    date: Date
    tags: [String]
  }
`

export interface Result {
  __typename?: string
  id?: string
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

export interface FakeCrawlResult {
  __typename?: string
  id: string
  slug?: string
  image?: string
  title?: string
  price?: string
  shipping?: string
  quantity?: string
  copy?: string
  date?: Date
  tags?: string[]
}

export interface Context<Cache = LRU.Cache<string, FakeCrawlResult[]>> {
  cache: Cache
}

export type Resolver = IFieldResolver<any, Context>
