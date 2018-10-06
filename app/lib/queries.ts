import { Layout } from '@/server/schema/queries/layout'
import { FakeData } from '@/server/schema/types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

export const getFakeData = () =>
  graphql<{}, { fake: FakeData[] }>(
    gql`
      query Fake {
        fake {
          title
          slug
          image
          copy
        }
      }
    `,
    {
      name: 'fakeData'
    }
  )

export const getLayout = () =>
  compose(
    graphql<{}, { layout: Layout }>(
      gql`
        query Layout {
          layout {
            cols
            data
          }
        }
      `,
      {
        name: 'layoutData'
      }
    ),
    graphql<{}, { setLayout: (layout: string) => Layout }>(
      gql`
        mutation setLayout($layout: String!) {
          setLayout(layout: $layout) {
            cols
            data
          }
        }
      `,
      {
        options: {
          refetchQueries: ['Layout']
        }
      }
    )
  )
