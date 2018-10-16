import gql from 'graphql-tag'

export { Context } from './context'

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

export default gql`
  scalar JSON
  scalar Date

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
