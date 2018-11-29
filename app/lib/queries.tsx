import { SetTags } from '@/server/schema/mutations/setTags'
import { FakeResult } from '@/server/schema/types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

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

export const getTags = () =>
  compose(
    graphql<{}, { setTags: SetTags }>(
      gql`
        mutation SetTags($ids: [String]!, $tags: [String]!) {
          setTags(ids: $ids, tags: $tags) {
            __typename
            id
            tags
          }
        }
      `
    ),
    graphql<{}, { tags: Partial<FakeResult[]> }>(
      gql`
        query GetTags {
          tags: fakeCrawl {
            __typename
            id
            tags
          }
        }
      `,
      {
        props: ({ data: { tags = [], ...data } }) => ({
          data,
          tags
        })
      }
    )
  )
