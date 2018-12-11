import { KeyValueCache } from 'apollo-server-core'
import gql from 'graphql-tag'
import { IFieldResolver } from 'graphql-tools'
import { Connection } from 'mongoose'

export default gql`
  scalar JSON
  scalar Date

  type Query {
    crawl(query: CrawlInput!): CrawlResult
    ebay(keywords: String!): EbayResult
    google(keywords: String!): CrawlResult
    products(query: Pagination): [Product]
    tags: [Tag]
    theme: String
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
    data: JSON
    date: Date
    hostname: String
    img: String
    meta: JSON
    title: String
    url: String
  }

  type Product @cacheControl(maxAge: 10e5) {
    _id: ID!
    bids: Int
    createdAt: Date
    image: String
    price: Int
    qty: Int
    shipping: Int
    slug: String
    tags: [Tag]
    title: String
  }

  type EbayResult @cacheControl(maxAge: 10e5) {
    items: [EbayItem]
    total: String
  }

  type EbayItem @cacheControl(maxAge: 10e5) {
    _id: ID!
    attribute: JSON
    autoPay: Boolean
    condition: JSON
    country: String
    galleryInfoContainer: JSON
    galleryURL: String
    globalId: String
    isMultiVariationListing: Boolean
    listingInfo: JSON
    location: String
    paymentMethod: JSON
    pictureURLSuperSize: String
    postalCode: String
    primaryCategory: JSON
    returnsAccepted: Boolean
    sellerInfo: JSON
    sellingStatus: JSON
    shippingInfo: JSON
    subtitle: String
    timestamp: Date
    title: String
    topRatedListing: Boolean
    unitPrice: JSON
    viewItemURL: String
  }

  type Tag @cacheControl(maxAge: 10e5) {
    _id: ID!
    slug: String
    title: String
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
    bids: Int
    price: Int
    qty: Int
    shipping: Int
    tags: [TagInput]
    title: String
  }

  input CrawlInput {
    parent: String!
    selectors: [SelectorInput]!
    url: String!
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
  __typename?: string
  _id: string
  bids?: number
  createdAt: Date
  image?: string
  price?: number
  qty?: number
  shipping?: number
  slug?: string
  tags?: Tag[]
  title?: string
}

export interface CrawlResult {
  __typename?: string
  _id: string
  data?: any
  err?: string
  hostname?: string
  img?: string
  meta?: any
  tags?: string[]
  title?: string
  url?: string
}

export interface EbayResult {
  __typename?: string
  items: EbayItem[]
  total: number
}

export interface EbayItem {
  __typename?: string
  _id: string
  attribute?: JSON
  autoPay?: boolean
  condition?: JSON
  country?: string
  galleryInfoContainer?: JSON
  galleryURL?: string
  globalId?: string
  isMultiVariationListing?: boolean
  itemId?: string
  listingInfo?: JSON
  location?: string
  paymentMethod?: string
  pictureURLSuperSize?: string
  postalCode?: string
  primaryCategory?: JSON
  returnsAccepted?: boolean
  sellerInfo?: JSON
  sellingStatus?: JSON
  shippingInfo?: JSON
  subtitle?: string
  timestamp?: Date
  title?: string
  topRatedListing?: boolean
  viewItemURL?: string
}

export interface Tag {
  __typename?: string
  _id: string
  slug?: string
  title?: string
  total?: number
}

export interface Context {
  cache: KeyValueCache
  mongo?: Connection
}

export type Resolver = IFieldResolver<any, Context>
