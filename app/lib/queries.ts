import { Layout } from '@/server/schema/queries/layout'
import { FakeCrawlResult, FakeStockResult } from '@/server/schema/types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

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

export const getFakeCrawl = () =>
  graphql<{}, { fake: FakeCrawlResult[] }>(
    gql`
      query FakeResult {
        fakeCrawl {
          title
          slug
          image
          copy
        }
      }
    `,
    {
      name: 'resultData',
      options: {}
    }
  )

export const getFakeStocks = () =>
  graphql<{}, { fake: FakeStockResult[] }>(
    gql`
      query FakeStock {
        fakeStock {
          date
          open
          high
          low
          close
          volume
          split
          dividend
          absoluteChange
          percentChange
        }
      }
    `,
    {
      name: 'stockData'
    }
  )
