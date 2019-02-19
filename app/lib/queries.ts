import { Product } from '@/server/schema/types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

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

export const GET_PRODUCTS = gql`
  query getProducts($paginationInput: Pagination) {
    products(paginationInput: $paginationInput) {
      ...ProductFields
    }
  }

  ${productFragment}
  ${tagFragment}
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
    $paginationInput: Pagination
  ) {
    ebay(keywords: $keywords, save: $save, paginationInput: $paginationInput) {
      ...EbayFields
    }
  }

  ${ebayFragment}
`

// ------------------------------------------------

export const GET_WATCHLIST = gql`
  query getWatchlist {
    watchlist @client {
      _id
      createdAt
      image
      price
      shipping
      status
      timeLeft
      title
      url
      tags {
        _id
        title
        slug
      }
    }
  }
`

export const SET_WATCHLIST = gql`
  mutation updateWatchlist($watchlist: [Product]) {
    updateWatchlist(watchlist: $watchlist) @client
  }
`

export const getWatchlist = () =>
  graphql<{}, { watchlist: Product[] }>(GET_WATCHLIST, {
    props: ({ data: { watchlist = [], ...data } }) => ({ data, watchlist })
  })

// ------------------------------------------------

export const REMOVE_DOC = gql`
  mutation remove($objectId: ID!, $collectionName: String!) {
    remove(objectId: $objectId, collectionName: $collectionName) {
      ok
    }
  }
`

export const MODIFY_DOC = gql`
  mutation modify($objectId: ID!, $collectionName: String!, $input: JSON) {
    modify(
      objectId: $objectId
      collectionName: $collectionName
      input: $input
    ) {
      ... on Product {
        _id
      }

      ... on Tag {
        _id
      }
    }
  }
`
