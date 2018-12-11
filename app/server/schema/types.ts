import { KeyValueCache } from 'apollo-server-core'
import gql from 'graphql-tag'
import { IFieldResolver } from 'graphql-tools'
import { Connection } from 'mongoose'

export default gql`
  scalar JSON
  scalar Date

  type Query {
    theme: String

    tags: [Tag]
    products(query: Pagination!): [Product]

    ebay(keywords: String!): EbayResult
    google(keywords: String!): CrawlResult
    crawl(query: CrawlInput!): CrawlResult
  }

  type Mutation {
    setTheme(theme: String!): String

    createTag(input: CreateTagInput!): Tag
    deleteTag(input: FindByID!): Boolean
  }

  type CrawlResult @cacheControl(maxAge: 10e5) {
    _id: ID!
    title: String
    img: String
    date: Date
    url: String
    hostname: String
    meta: JSON
    data: JSON
  }

  type Product @cacheControl(maxAge: 10e5) {
    _id: ID!
    createdAt: Date
    slug: String
    image: String
    title: String
    price: Int
    shipping: Int
    qty: Int
    bids: Int
    tags: [Tag]
  }

  type EbayResult @cacheControl(maxAge: 10e5) {
    total: String
    items: [EbayItem]
  }

  type EbayItem @cacheControl(maxAge: 10e5) {
    _id: ID!
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

  type Tag {
    _id: ID!
    title: String
    slug: String
  }

  input Selector {
    key: String!
    selector: String!
  }

  input CreateTagInput {
    tag: String!
  }

  input FindByID {
    id: ID!
  }

  input CrawlInput {
    url: String!
    parent: String!
    selectors: [Selector]!
  }

  input Pagination {
    offset: Int
    limit: Int
  }
`

export interface Product {
  __typename?: string
  _id: string
  createdAt: Date
  slug?: string
  image?: string
  title?: string
  tags?: string[]
  price?: number
  shipping?: number
  qty?: number
  bids?: number
}

export interface CrawlResult {
  __typename?: string
  _id: string
  err?: string
  title?: string
  img?: string
  url?: string
  hostname?: string
  meta?: JSON
  data?: JSON
  tags?: string[]
}

export interface EbayResult {
  __typename?: string
  total: number
  items: EbayItem[]
}

export interface EbayItem {
  __typename?: string
  _id: string
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

export interface Tag {
  __typename?: string
  _id: string
  title: string
  slug: string
}

export interface Context {
  cache: KeyValueCache
  mongo?: Connection
}

export type Resolver = IFieldResolver<any, Context>
