import { KeyValueCache } from 'apollo-server-core'
import { ObjectID } from 'bson'
import gql from 'graphql-tag'
import { IFieldResolver } from 'graphql-tools'
import { Collection, Connection } from 'mongoose'

export default gql`
  scalar JSON
  scalar Date
  union T = Product | Tag

  type Query {
    crawl(query: CrawlInput!): CrawlResult

    ebay(
      keywords: String!
      save: Boolean
      paginationInput: Pagination
    ): EbayResult

    google(keywords: String!): CrawlResult
    products(paginationInput: Pagination, input: JSON): [Product]
    tags: [Tag]

    totalProducts: Int
    totalTags: Int
  }

  type Mutation {
    createTag(input: TagInput): Tag
    createProduct(input: ProductInput): Product

    remove(objectId: ID, collectionName: String!, input: JSON): MongoResult
    modify(objectId: ID, collectionName: String!, input: JSON): T
  }

  type MongoResult {
    ok: Int
    n: Int
  }

  type Product @cacheControl(maxAge: 10e5) {
    bids: Float
    image: String
    price: Float
    qty: Float
    query: String
    shipping: Float
    slug: String
    status: String
    tags: [Tag]
    timeLeft: Date
    title: String
    url: String
    username: String
  }

  type Tag @cacheControl(maxAge: 10e5) {
    slug: String
    title: String
    total: Int
  }

  extend type Product {
    _id: ID!
    createdAt: Date
    updatedAt: Date
  }

  extend type Tag {
    _id: ID!
    createdAt: Date
    updatedAt: Date
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

  type EbayResult @cacheControl(maxAge: 10e5) {
    items: [EbayItem]
    total: String
    totalPages: String
    op: String
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
    itemId: String
    listingInfo: JSON
    location: String
    paymentMethod: JSON
    pictureURLSuperSize: String
    postalCode: String
    primaryCategory: JSON
    productId: String
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

  input SelectorInput {
    key: String!
    selector: String!
  }

  input TagInput {
    title: String
    total: Int
  }

  input ProductInput {
    title: String
    url: String
    tags: [ID]
    bids: Int
  }

  input CrawlInput {
    parent: String!
    selectors: [SelectorInput]!
    url: String!
  }

  input Pagination {
    pageNumber: Int
    entriesPerPage: Int
  }
`

export interface Product extends MongoEntry {
  bids?: number
  image?: string
  price?: number
  qty?: number
  shipping?: number
  slug?: string
  tags?: Array<Tag['_id']> | Tag[] | ObjectID[]
  url?: string
  username?: string
  query?: string
  timeLeft?: Date
  status?: string
}

export interface Tag extends MongoEntry {
  slug?: string
  total?: number
}

export interface Context {
  cache: KeyValueCache
  mongo?: Connection & {
    tags: Collection
    products: Collection
    theme: Collection
  }
}

export interface MongoEntry {
  __typename?: string
  _id: string
  title?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CrawlResult {
  __typename?: string
  _id: string
  data?: JSON | any
  date?: Date
  hostname?: string
  img?: string
  meta?: JSON | any
  title?: string
  url?: string
}

export interface EbayResult {
  __typename?: string
  op?: string
  items?: EbayItem[]
  total?: number | string
  totalPages?: number | string
}

export interface EbayItem {
  __typename?: string
  _id: string
  attribute?: any
  autoPay?: boolean
  condition?: any
  country?: string
  galleryInfoContainer?: any
  galleryURL?: string
  globalId?: string
  isMultiVariationListing?: boolean
  itemId?: string
  listingInfo?: any
  location?: string
  paymentMethod?: string
  pictureURLSuperSize?: string
  postalCode?: string
  primaryCategory?: any
  productId?: string
  returnsAccepted?: boolean
  sellerInfo?: any
  sellingStatus?: any
  shippingInfo?: any
  subtitle?: string
  timestamp?: Date
  title?: string
  topRatedListing?: boolean
  unitPrice?: any
  viewItemURL?: string
}

export type Resolver = IFieldResolver<any, Context>
