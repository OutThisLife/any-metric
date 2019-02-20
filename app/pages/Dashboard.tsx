import Chart from '@/components/Chart'
import Search from '@/components/Search'
import Table from '@/components/Table'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

export default compose(setDisplayName('dashboard'))(() => (
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
      <Table />
    </Box>

    <Chart />
  </Box>
))
