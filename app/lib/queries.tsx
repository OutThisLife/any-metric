import { MockResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import gql from 'graphql-tag'
import { ChildProps, DataProps, graphql } from 'react-apollo'

import { parseTags } from './utils'

export const getmockData = () =>
  graphql<{}, { results: MockResult[] }>(
    gql`
      query GetMockResult($offset: Int, $limit: Int) {
        results: mockData(offset: $offset, limit: $limit) {
          id
          slug
          image
          title
          price
          shipping
          quantity
          bids
          copy
          date
          tags
        }
      }
    `,
    {
      options: {
        variables: {
          offset: 0,
          limit: 25
        }
      },
      props: ({ data: { results = [], ...data } }) => ({
        data,
        results
      })
    }
  )

export const getTags = (fn = parseTags) =>
  graphql<{}, { results: MockResult[] }>(
    gql`
      query GetMockResult($offset: Int, $limit: Int) {
        results: mockData(offset: $offset, limit: $limit) {
          tags
        }
      }
    `,
    {
      options: {
        variables: {
          offset: 0,
          limit: 25
        }
      },
      props: ({ data: { results = [], ...data } }) => ({
        data,
        initialTags: fn(results)
      })
    }
  )

export const getTheme = () =>
  graphql<
    {},
    { theme: { value: string } },
    DataProps<{ theme: { value: string } }>,
    ChildProps<BaphoTheme>
  >(
    gql`
      {
        theme {
          value
        }
      }
    `,
    {
      props: ({ data: { theme } }) => ({ theme: JSON.parse(theme.value) })
    }
  )
