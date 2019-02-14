# \$̴̛̥̞̞̅̅̊͒̎͐̍̾̍̉͘̚

```graphql
mutation {
  createTag(input: { title: "Product Name", isQuery: true }) {
    _id
    title
    slug
  }
}
```

```graphql
mutation {
  createProduct(input: { title: "Product Name" }) {
    _id
    title
    slug
  }
}
```

```graphql
mutation {
  modify(
    objectId: "5c1001bb32245fbaaa48d9bd"
    collectionName: "products"
    input: {
      price: 2
      tags: ["5c101eb5c430c99818bdde70", "5c101f3cc430c99818bdde71"]
    }
  ) {
    ... on Product {
      _id
      tags {
        _id
        title
      }
    }

    ... on Tag {
      _id
      title
    }
  }
}
```

```graphql
{
  ebay(
    keywords: "product name"
    save: false
    paginationInput: { entriesPerPage: 3, pageNumber: 1 }
  ) {
    total
    items {
      _id
      title
      pictureURLSuperSize
    }
  }
}
```

```graphql
{
  products {
    _id
    title
    tags {
      _id
      title
    }
  }

  tags {
    _id
    title
    total
  }
}
```

```graphql
mutation {
  remove(collectionName: "allTags") {
    ok
  }
}

mutation {
  remove(collectionName: "allProducts") {
    ok
  }
}
```

# Schema

```graphql
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
  products(paginationInput: Pagination): [Product]
  tags: [Tag]
  theme: String
}

type Mutation {
  setTheme(theme: String!): String

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
}

type Tag @cacheControl(maxAge: 10e5) {
  isQuery: Boolean
  slug: String
  title: String
  total: Int
}

extend type Product {
  _id: ID!
  createdAt: Date
  deletedAt: Date
  isDeleted: Boolean
  restoredAt: Date
  updatedAt: Date
}

extend type Tag {
  _id: ID!
  createdAt: Date
  deletedAt: Date
  isDeleted: Boolean
  restoredAt: Date
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
  isQuery: Boolean
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
```
