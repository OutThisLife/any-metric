import { FakeResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import gql from 'graphql-tag'
import { ChildProps, DataProps, graphql } from 'react-apollo'

export const getFakeCrawl = () =>
  graphql<{}, { results: FakeResult[] }>(
    gql`
      query GetFakeResult($offset: Int, $limit: Int) {
        results: fakeCrawl(offset: $offset, limit: $limit) {
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
