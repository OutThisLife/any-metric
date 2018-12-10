import { Product } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import gql from 'graphql-tag'
import { ChildProps, DataProps, graphql } from 'react-apollo'

import { parseTags } from './utils'

export const getProducts = () =>
  graphql<{}, { results: Product[] }>(
    gql`
      query GetProduct($query: Pagination!) {
        results: products(query: $query) {
          _id
          createdAt
          slug
          image
          title
          tags
          price
          shipping
          qty
          bids
        }
      }
    `,
    {
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
    }
  )

export const getTags = (fn = parseTags) =>
  graphql<{}, { results: Product[] }>(
    gql`
      query GetProduct($query: Pagination!) {
        results: products(query: $query) {
          tags
        }
      }
    `,
    {
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
        initialTags: fn(results)
      })
    }
  )

export const getTheme = () =>
  graphql<
    {},
    { theme: string },
    DataProps<{ theme: string }>,
    ChildProps<BaphoTheme>
  >(
    gql`
      {
        theme
      }
    `,
    {
      props: ({ data: { theme } }) => ({ theme: JSON.parse(theme) })
    }
  )
