import Chart from '@/components/Chart'
import Search from '@/components/Search'
import Table from '@/components/Table'
import { getProducts } from '@/lib/queries'
import { Product, Tag } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

export default compose<HomeState, {}>(
  setDisplayName('dashboard'),
  getProducts({
    variables: {
      paginationInput: {
        pageNumber: 1,
        entriesPerPage: 5000
      }
    }
  })
)(({ products = [] }) => (
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
      <Table
        data={products}
        tags={products
          .filter(t => t.tags.length)
          .map(t => (t.tags as Tag[])[0])
          .filter((v, i, r) => r.indexOf(v) === i)}
      />
    </Box>

    <Chart data={products} />
  </Box>
))

export interface HomeState {
  products?: Product[]
}
