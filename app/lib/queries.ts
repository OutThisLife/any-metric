import { SetLayout } from '@/server/schema/mutations/setLayout'
import { SetTags } from '@/server/schema/mutations/setTags'
import { LayoutResult } from '@/server/schema/queries/layout'
import { FakeCrawlResult } from '@/server/schema/types'
import gql from 'graphql-tag'
import { ChildDataProps, graphql } from 'react-apollo'
import { branch, compose, renderComponent } from 'recompose'

import { flatten } from './utils'

export const getFakeCrawl = () =>
  graphql<{}, { fake: FakeCrawlResult[] }>(
    gql`
      query GetFakeResult {
        fakeCrawl {
          id
          title
          slug
          image
          copy
          date
          tags
        }
      }
    `,
    {
      name: 'resultData'
    }
  )

export const getLayout = () =>
  compose(
    graphql<{}, { layout: LayoutResult }>(
      gql`
        query GetLayout {
          layout {
            id
            cols
            data
          }
        }
      `,
      {
        name: 'layoutData'
      }
    ),
    branch(
      ({ layoutData: { loading } }) => loading,
      renderComponent(() => null)
    ),
    graphql<{}, { setLayout: SetLayout }>(
      gql`
        mutation setLayout($layout: String!) {
          setLayout(layout: $layout) {
            __typename
            id
            cols
            data
          }
        }
      `
    )
  )

export const getTags = () =>
  compose(
    graphql<
      {},
      { fakeCrawl: Partial<FakeCrawlResult[]> },
      {},
      ChildDataProps<{ tags: string[] }>
    >(
      gql`
        query GetTags {
          fakeCrawl {
            id
            tags
          }
        }
      `,
      {
        props: ({ data: { fakeCrawl, ...data } }) => ({
          data,
          tags: flatten(fakeCrawl, 'tags')
        })
      }
    ),

    branch(({ data: { loading } }) => loading, renderComponent(() => null)),

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
    )
  )
