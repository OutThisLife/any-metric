import gql from 'graphql-tag'
import * as LRU from 'lru-cache'

export default gql`
  scalar JSON

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

  type FakeResult {
    image: String
    title: String
    price: String
    copy: String
    slug: String
  }

  type LayoutResult {
    cols: Int
    data: JSON
  }

  type Query {
    crawl(url: String!, parent: String!, children: [Selector]!): CrawlResult
    search(q: String!): CrawlResult
    history: [CrawlResult]
    layout: LayoutResult
    fake(seed: Int): [FakeResult]
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

export interface FakeData {
  image?: string
  title?: string
  price?: string
  copy?: string
  slug?: string
}
