import Chart from '@/components/Chart'
import Search from '@/components/Search'
import Table from '@/components/Table'
import { GET_PRODUCTS, GET_TAGS, GET_TOTAL_PRODUCTS } from '@/lib/queries'
import { Product, Tag } from '@/server/schema/types'
import orderBy from 'lodash/orderBy'
import { graphql, GraphqlQueryControls } from 'react-apollo'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

export const entriesPerPage = 50

export default compose<HomeState, {}>(
  setDisplayName('dashboard'),
  graphql<{}, { totalProducts: number }>(GET_TOTAL_PRODUCTS, {
    props: ({ data: { totalProducts = 0, ...data } }) => ({
      data,
      totalProducts
    })
  }),
  graphql<{}, { tags: Tag[] }>(GET_TAGS, {
    props: ({ data: { tags = [], ...data } }) => ({
      data,
      tags
    })
  }),
  graphql<HomeState['fetchMore'], { products: Product[] }>(GET_PRODUCTS, {
    options: {
      variables: {
        paginationInput: {
          pageNumber: 1,
          entriesPerPage
        },
        input: {
          status: {
            $ne: 'EndedWithoutSales'
          }
        }
      }
    },
    props: ({ data: { products = [], ...data } }) => ({
      data,
      products: orderBy(products, 'createdAt', 'asc'),
      fetchMore: async (paginationInput = {}, input = {}) =>
        data.fetchMore({
          variables: {
            paginationInput,
            input
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return prev
            }

            return fetchMoreResult
          }
        })
    })
  })
)(({ totalProducts, tags = [], fetchMore }) => (
  <Box
    css={`
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 66% 33%;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      margin: auto;
      padding: 10px 25px 25px;
    `}>
    <Box
      css={`
        z-index: 100;
        position: relative;
      `}>
      <Search />
      <Table total={totalProducts} fetchMore={fetchMore} tags={tags} />
    </Box>

    <Chart />
  </Box>
))

export interface HomeState {
  products: Product[]
  tags: Tag[]
  totalProducts: number
  fetchMore: (
    paginationInput: {
      pageNumber?: number
      entriesPerPage?: number
    },
    input?: { [key: string]: any }
  ) => Promise<GraphqlQueryControls<{ products: Product[] }>['fetchMore']>
}