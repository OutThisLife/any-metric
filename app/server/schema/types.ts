import * as DataLoader from 'dataloader'
import gql from 'graphql-tag'
import { IFieldResolver } from 'graphql-tools'
import * as LRU from 'lru-cache'

export interface Result {
  id: string
  err?: string
  title: string
  img?: string
  url: string
  date?: Date
  hostname: string
  meta?: any
  data?: any
  tags?: string[]
}

export interface FakeCrawlResult {
  id: string
  image?: string
  title?: string
  price?: string
  copy?: string
  slug?: string
  date?: Date
  tags?: string[]
}

export interface Context<Cache = LRU.Cache<string, FakeCrawlResult[]>> {
  cache: Cache
  fakeResultLoader: (lru: Cache) => DataLoader<string, FakeCrawlResult>
  genFakeResults: (
    lru: Cache,
    ids?: string[] | undefined
  ) => Promise<FakeCrawlResult[]>
}

export type Resolver = IFieldResolver<any, Context>

export const typeDefs = gql`
  scalar JSON
  scalar Date

  type Query {
    crawl(url: String!, parent: String!, children: [Selector]!): CrawlResult
    fakeCrawl(id: [String]): [FakeCrawlResult]
    search(q: String!): CrawlResult
    layout: LayoutResult
  }

  type Mutation {
    setLayout(cols: Int, layout: String!): LayoutResult
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
    data(limit: Int): JSON
    tags: [String]
  }

  type LayoutResult {
    id: ID!
    cols: Int
    data: JSON
  }

  type FakeCrawlResult {
    id: ID!
    image: String
    title: String
    price: String
    copy: String
    slug: String
    date: Date
    tags: [String]
  }
`

export const fakeResultFrag = gql`
  fragment fakeResultFields on FakeCrawlResult {
    id
    title
    slug
    image
    copy
    date
    tags
  }
`

export const layoutFrag = gql`
  fragment layoutFields on LayoutResult {
    cols
    data
  }
`
