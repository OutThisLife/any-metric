import gql from 'graphql-tag'
import * as LRU from 'lru-cache'

export default gql`
  scalar JSON
  scalar Date

  input Selector {
    parent: String
    name: String
    el: String
  }

  type CrawlResult {
    id: ID
    title: String
    img: String
    url: String
    hostname: String
    meta: JSON
    data(limit: Int): JSON
  }

  type LayoutResult {
    cols: Int
    data: JSON
  }

  type FakeCrawlResult {
    image: String
    title: String
    price: String
    copy: String
    slug: String
    date: Date
    tags: [String]
  }

  type Query {
    crawl(url: String!, parent: String!, children: [Selector]!): CrawlResult
    search(q: String!): CrawlResult
    history: [CrawlResult]
    layout: LayoutResult

    fakeCrawl(seed: Int): [FakeCrawlResult]
  }

  type Mutation {
    setLayout(cols: Int, layout: String!): LayoutResult
  }
`

export interface Context {
  cache: LRU.Cache<any, any>
}

export interface Result {
  err?: string
  id: number
  title: string
  img?: string
  url: string
  hostname: string
  meta?: any
  data?: any
}

export interface FakeCrawlResult {
  image?: string
  title?: string
  price?: string
  copy?: string
  slug?: string
  date?: Date
  tags?: string[]
}
