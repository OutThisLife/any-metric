import { SetLayout } from '@/server/schema/mutations/setLayout'
import { SetTags } from '@/server/schema/mutations/setTags'
import { Layout } from '@/server/schema/queries/layout'
import {
  FakeCrawlResult,
  fakeResultFrag,
  layoutFrag
} from '@/server/schema/types'
import gql from 'graphql-tag'
import { ChildDataProps, graphql } from 'react-apollo'
import { compose } from 'recompose'

import { flatten } from './utils'

export const getFakeCrawl = () =>
  graphql<{}, { fake: FakeCrawlResult[] }>(
    gql`
      query FakeResult {
        fakeCrawl {
          ...fakeResultFields
        }
      }

      ${fakeResultFrag}
    `,
    {
      name: 'resultData'
    }
  )

export const getLayout = () =>
  compose(
    graphql<{}, { layout: Layout }>(
      gql`
        query Layout {
          layout {
            ...layoutFields
          }
        }

        ${layoutFrag}
      `,
      {
        name: 'layoutData'
      }
    ),
    graphql<{}, { setLayout: SetLayout }>(
      gql`
        mutation setLayout($layout: String!) {
          setLayout(layout: $layout) {
            ...layoutFields
          }
        }

        ${layoutFrag}
      `,
      {
        options: {
          refetchQueries: ['Layout']
        }
      }
    )
  )

export const getTags = () =>
  compose(
    graphql<
      {},
      { fakeCrawl: Array<{ tags: string[] }> },
      {},
      ChildDataProps<{ tags: string[] }>
    >(
      gql`
        query Tags {
          fakeCrawl {
            ...fakeResultFields
          }
        }

        ${fakeResultFrag}
      `,
      {
        props: ({ data: { fakeCrawl, ...data } }) => ({
          data,
          tags: flatten(fakeCrawl, 'tags')
        })
      }
    ),

    graphql<{}, { setTags: SetTags }>(
      gql`
        mutation setTags($ids: [String]!, $tags: [String]!) {
          setTags(ids: $ids, tags: $tags) {
            ...fakeResultFields
          }
        }

        ${fakeResultFrag}
      `,
      {
        options: { refetchQueries: ['fakeCrawl'] }
      }
    )
  )
