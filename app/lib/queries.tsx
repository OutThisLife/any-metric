import { SetLayout } from '@/server/schema/mutations/setLayout'
import { SetTags } from '@/server/schema/mutations/setTags'
import { cols as defaultCols } from '@/server/schema/queries/layout'
import {
  FakeCrawlResult,
  fakeResultFrag,
  layoutFrag,
  LayoutResult
} from '@/server/schema/types'
import { Pane, Spinner } from 'evergreen-ui'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { branch, compose, renderComponent, setDisplayName } from 'recompose'

import { flatten } from './utils'

export const getFakeCrawl = () =>
  compose(
    setDisplayName('get-fake-crawl'),
    graphql<{}, { results: FakeCrawlResult[] }>(
      gql`
        query GetFakeResult {
          results: fakeCrawl {
            ...fakeResultFields
          }
        }

        ${fakeResultFrag}
      `,
      {
        options: { ssr: false },
        props: ({ data: { results = [], ...data } }) => ({
          data,
          results
        })
      }
    ),
    branch(
      ({ data: { loading } }) => loading,
      renderComponent(() => <Loading />)
    )
  )

export const getLayout = () =>
  compose(
    setDisplayName('get-layout'),
    graphql<{}, { setLayout: SetLayout }>(
      gql`
        mutation setLayout($layout: String!) {
          setLayout(layout: $layout) {
            __typename
            ...layoutFields
          }
        }

        ${layoutFrag}
      `
    ),
    graphql<{}, { layout: LayoutResult }>(
      gql`
        query GetLayout {
          layout {
            ...layoutFields
          }
        }

        ${layoutFrag}
      `,
      {
        props: ({
          data: {
            layout = {
              cols: defaultCols,
              data: []
            },
            ...data
          }
        }) => ({ data, layout })
      }
    )
  )

export const getTags = () =>
  compose(
    setDisplayName('get-tags'),
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
          tags: flatten(tags, 'tags')
        })
      }
    )
  )

export const Loading = (props: any) => (
  <Pane
    display="flex"
    alignItems="center"
    width="100%"
    height="100%"
    {...props}>
    <Spinner marginX="auto" />
  </Pane>
)
