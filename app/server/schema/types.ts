import { KeyValueCache } from 'apollo-server-core'
import gql from 'graphql-tag'
import { IFieldResolver } from 'graphql-tools'

export default gql`
  scalar JSON
  scalar Date

  type Query {
    theme: Theme

    ebay(keywords: String!): EbayResult
    crawl(url: String!, parent: String!, selectors: [Selector]!): CrawlResult
    google(keywords: String!): CrawlResult

    mockData(ids: [String], offset: Int, limit: Int): [MockResult]
  }

  type Mutation {
    setTheme(theme: String!): Theme
  }

  type Theme {
    value: String
  }

  input Selector {
    key: String!
    selector: String!
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
  }

  type MockResult @cacheControl(maxAge: 10e5) {
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

  type EbayResult {
    total: String
    items: [EbayItem]
  }

  type EbayItem @cacheControl(maxAge: 10e5) {
    id: ID!
    title: String
    globalId: String
    primaryCategory: JSON
    viewItemURL: String
    paymentMethod: String
    autoPay: Boolean
    postalCode: String
    location: String
    country: String
    shippingInfo: JSON
    sellingStatus: JSON
    listingInfo: JSON
    returnsAccepted: Boolean
    condition: JSON
    isMultiVariationListing: Boolean
    topRatedListing: Boolean
  }
`

export interface CrawlResult {
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

export interface MockResult {
  __typename?: string
  id: string
  slug?: string
  image?: string
  title?: string
  price?: string
  close?: string
  shipping?: string
  quantity?: string
  bids?: string
  copy?: string
  date?: Date
  tags?: string[]
}

export interface EbayResult {
  __typename?: string
  total: number
  items: EbayItem[]
}

export interface EbayItem {
  id: string
  itemId?: string
  title?: string
  globalId?: string
  primaryCategory?: JSON
  viewItemURL?: string
  paymentMethod?: string
  autoPay?: boolean
  postalCode?: string
  location?: string
  country?: string
  shippingInfo?: JSON
  sellingStatus?: JSON
  listingInfo?: JSON
  returnsAccepted?: boolean
  condition?: JSON
  isMultiVariationListing?: boolean
  topRatedListing?: boolean
}

export interface Context {
  cache: KeyValueCache
}

export type Resolver = IFieldResolver<any, Context>
