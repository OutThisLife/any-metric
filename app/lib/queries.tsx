import { SetLayout } from '@/server/schema/mutations/setLayout'
import { SetTags } from '@/server/schema/mutations/setTags'
import { LayoutResult } from '@/server/schema/queries/layout'
import { FakeCrawlResult } from '@/server/schema/types'
import { Pane, Spinner } from 'evergreen-ui'
import gql from 'graphql-tag'
import { ChildDataProps, graphql } from 'react-apollo'
import { branch, compose, renderComponent } from 'recompose'

import { flatten } from './utils'

export const Loading = props => (
  <Pane display="flex" alignItems="center" {...props}>
    <Spinner marginX="auto" />
  </Pane>
)

export const getFakeCrawl = () =>
  compose(
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
    ),
    branch(
      ({ resultData: { networkStatus } }) => networkStatus !== 7,
      renderComponent(() => <Loading />)
    )
  )

export const getLayout = () =>
  compose(
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
    ),
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
      ({ layoutData: { networkStatus } }) => networkStatus !== 7,
      renderComponent(() => <Loading />)
    )
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

    branch(
      ({ data: { networkStatus } }) => networkStatus !== 7,
      renderComponent(() => <Loading />)
    )
  )
