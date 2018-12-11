import { Product, Tag } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import gql from 'graphql-tag'
import { ChildProps, DataProps, graphql } from 'react-apollo'
import {
  compose,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from 'recompose'

export const GET_PRODUCTS = gql`
  query GetProduct($query: Pagination!) {
    results: products(query: $query) {
      _id
      bids
      createdAt
      image
      price
      qty
      shipping
      slug
      tags {
        _id
        slug
        title
        total
      }
      title
    }
  }
`

export const getProducts = () =>
  graphql<{}, { results: Product[] }>(GET_PRODUCTS, {
    options: ({ pagination }: any) => ({
      variables: {
        query: pagination || {
          offset: 0,
          limit: 25
        }
      }
    }),
    props: ({ data: { results = [], ...data } }) => ({
      data,
      results
    })
  })

// ------------------------------------------------

export const GET_TAGS = gql`
  {
    tags {
      _id
      slug
      title
      total
    }
  }
`

export const getTags = () =>
  compose<TagState & TagHandlers, {}>(
    graphql<{}, { tags: Tag[] }>(GET_TAGS, {
      props: ({ data: { tags = [], ...data } }) => ({
        data,
        initialTags: tags
      })
    }),
    withStateHandlers<TagState, TagHandlers>(
      ({ initialTags = [] }: { initialTags: Tag[] }) => ({ tags: initialTags }),
      {
        addTag: ({ tags }) => (tag: Tag) => {
          if (!tags.find(t => shallowEqual(t, tag))) {
            tags.push(tag)
          }

          return { tags }
        },

        delTag: ({ tags }) => (tag: Tag) => {
          if (
            window.confirm(
              'Are you sure you want to delete this tag? All references will be lost.'
            )
          ) {
            tags.splice(tags.findIndex(t => t === tag), 1)
            return { tags }
          }
        }
      }
    )
  )

export interface TagState {
  tags?: Tag[]
  initialTags?: Tag[]
}

export interface TagHandlers extends StateHandlerMap<TagState> {
  addTag?: StateHandler<TagState>
  delTag?: StateHandler<TagState>
}

// ------------------------------------------------

export const GET_THEME = gql`
  {
    theme
  }
`

export const getTheme = () =>
  graphql<
    {},
    { theme: string },
    DataProps<{ theme: string }>,
    ChildProps<BaphoTheme>
  >(GET_THEME, {
    props: ({ data: { theme } }) => ({ theme: JSON.parse(theme) })
  })

// ------------------------------------------------

export const SEARCH_EBAY = gql`
  query GetEbay($keywords: String!) {
    ebay(keywords: $keywords) {
      total
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
  }
`
