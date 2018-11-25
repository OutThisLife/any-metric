import Box from '@/components/Box'
import { SetTags } from '@/server/schema/mutations/setTags'
import { FakeCrawlResult } from '@/server/schema/types'
import { Spinner } from 'evergreen-ui'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

export const getFakeCrawl = () =>
  graphql<{}, { results: FakeCrawlResult[] }>(
    gql`
      query GetFakeResult {
        results: fakeCrawl {
          id
          slug
          image
          title
          price
          shipping
          quantity
          copy
          date
          tags
        }
      }
    `,
    {
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
    graphql<{}, { tags: Partial<FakeCrawlResult[]> }>(
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

export const Loading = (props: any) => (
  <Box display="flex" alignItems="center" width="100%" height="100%" {...props}>
    <Spinner marginX="auto" />
  </Box>
)
