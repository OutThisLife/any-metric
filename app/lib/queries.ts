import gql from 'graphql-tag'

export const tagFragment = gql`
  fragment TagFields on Tag {
    _id
    createdAt
    slug
    title
    total
    updatedAt
  }
`

export const productFragment = gql`
  fragment ProductFields on Product {
    _id
    tags {
      ...TagFields
    }
    bids
    createdAt
    image
    price
    qty
    shipping
    slug
    status
    timeLeft
    title
    updatedAt
    url
  }
`

// ------------------------------------------------

export const GET_FULL_PRODUCTS = gql`
  query getProducts($paginationInput: Pagination, $input: JSON) {
    products(paginationInput: $paginationInput, input: $input) {
      ...ProductFields
    }
  }

  ${productFragment}
  ${tagFragment}
`

export const GET_PRODUCTS = gql`
  query getProducts($input: JSON) {
    products(
      paginationInput: { pageNumber: 1, entriesPerPage: 2345 }
      input: $input
    ) {
      _id
      close: price
      date: createdAt
      image
      qty
      slug
      status
      title
      url
    }
  }
`

export const GET_TOTAL_PRODUCTS = gql`
  query getTotalProducts {
    totalProducts
  }
`

// ------------------------------------------------

export const GET_TAGS = gql`
  query getTags {
    tags {
      ...TagFields
    }
  }

  ${tagFragment}
`

export const CREATE_TAG = gql`
  mutation createTag($input: TagInput) {
    createTag(input: $input) {
      ...TagFields
    }
  }

  ${tagFragment}
`

// ------------------------------------------------

const ebayFragment = gql`
  fragment EbayFields on EbayResult {
    total
    totalPages
    totalEntries
    tag {
      _id
    }
    items {
      _id
      attribute
      autoPay
      condition
      country
      galleryInfoContainer
      galleryURL
      globalId
      isMultiVariationListing
      listingInfo
      location
      paymentMethod
      pictureURLSuperSize
      postalCode
      primaryCategory
      returnsAccepted
      sellerInfo
      sellingStatus
      shippingInfo
      subtitle
      timestamp
      title
      topRatedListing
      unitPrice
      viewItemURL
    }
  }
`

export const SEARCH_EBAY = gql`
  query getEbay(
    $keywords: String!
    $save: Boolean
    $operation: String
    $paginationInput: Pagination
  ) {
    ebay(
      keywords: $keywords
      save: $save
      operation: $operation
      paginationInput: $paginationInput
    ) {
      ...EbayFields
    }
  }

  ${ebayFragment}
`

export const SEARCH_EBAY_BARE = gql`
  query getEbay(
    $keywords: String!
    $save: Boolean
    $operation: String
    $paginationInput: Pagination
  ) {
    ebay(
      keywords: $keywords
      save: $save
      operation: $operation
      paginationInput: $paginationInput
    ) {
      op
      total
      totalPages
      tag {
        _id
      }
    }
  }
`

// ------------------------------------------------

export const REMOVE_DOC = gql`
  mutation remove($objectId: ID, $collectionName: String!, $input: JSON) {
    remove(
      objectId: $objectId
      collectionName: $collectionName
      input: $input
    ) {
      ok
    }
  }
`

export const MODIFY_DOC = gql`
  mutation modify($objectId: ID, $collectionName: String!, $input: JSON) {
    modify(
      objectId: $objectId
      collectionName: $collectionName
      input: $input
    ) {
      ok
    }
  }
`

// ------------------------------------------------

export const GET_VIEW = gql`
  query getView($objectId: ID, $input: JSON) {
    view(objectId: $objectId, input: $input) {
      _id

      tags {
        ...TagFields
      }
    }
  }

  ${tagFragment}
`
