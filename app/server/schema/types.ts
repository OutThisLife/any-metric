import { KeyValueCache } from 'apollo-server-core'
import gql from 'graphql-tag'
import { IFieldResolver } from 'graphql-tools'
import { Connection } from 'mongoose'

export default gql`
  scalar JSON
  scalar Date

  type Query {
    theme: String

    products(query: Pagination): [Product]
    tags: [Tag]

    ebay(keywords: String!): EbayResult
    google(keywords: String!): CrawlResult
    crawl(query: CrawlInput!): CrawlResult
  }

  type Mutation {
    setTheme(theme: String!): String

    createTag(input: TagInput): Tag
    deleteTag(input: ObjectID!): Boolean

    createProduct(input: ProductInput): Product
    deleteProduct(input: ObjectID!): Boolean
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

  type Tag @cacheControl(maxAge: 10e5) {
    _id: ID!
    title: String
    slug: String
    total: Int
  }

  input SelectorInput {
    key: String!
    selector: String!
  }

  input TagInput {
    tag: String!
  }

  input ProductInput {
    title: String
    title: String
    price: Int
    shipping: Int
    qty: Int
    bids: Int
    tags: [TagInput]
  }

  input CrawlInput {
    url: String!
    parent: String!
    selectors: [SelectorInput]!
  }

  input ObjectID {
    id: ID!
  }

  input Pagination {
    offset: Int
    limit: Int
  }
`

export interface Product {
  _id: string
  __typename?: string
  createdAt: Date
  title?: string
  slug?: string
  image?: string
  tags?: Tag[]
  price?: number
  shipping?: number
  qty?: number
  bids?: number
}

export interface CrawlResult {
  _id: string
  __typename?: string
  err?: string
  title?: string
  img?: string
  url?: string
  hostname?: string
  meta?: any
  data?: any
  tags?: string[]
}

export interface EbayResult {
  __typename?: string
  total: number
  items: EbayItem[]
}

export interface EbayItem {
  _id: string
  __typename?: string
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
  _id: string
  __typename?: string
  title?: string
  slug?: string
  total?: number
}

export interface Context {
  cache: KeyValueCache
  mongo?: Connection
}

export type Resolver = IFieldResolver<any, Context>
