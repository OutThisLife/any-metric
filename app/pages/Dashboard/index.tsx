import Categories from '@/components/Categories'
import Chart from '@/components/Chart'
import Table from '@/components/Table'
import { GET_PRODUCTS } from '@/lib/queries'
import { Product, Tag } from '@/server/schema/types'
import { siteName } from '@/theme'
import fz from 'fuzzaldrin-plus'
import { orderBy } from 'lodash'
import Head from 'next/head'
import { func } from 'prop-types'
import { graphql } from 'react-apollo'
import { Box, BoxProps, Flex } from 'rebass'
import {
  compose,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  withContext,
  withState
} from 'recompose'

export default compose<HomeState & HomeProps & HomeStateHandlers, HomeProps>(
  setDisplayName('dashboard'),
  withState('filter', 'setFilter', {
    value: '',
    action: 'RESET'
  }),
  graphql<HomeState & HomeProps & HomeStateHandlers, HomeState>(GET_PRODUCTS, {
    props: ({
      data: { products: initial = [], ...data },
      ownProps: {
        filter: { action, value }
      }
    }) => {
      const getProducts = (f: (t?: Tag) => boolean = () => true) => {
        switch (action) {
          default:
            return initial

          case 'TAG':
            return initial.filter(d =>
              (d.tags as Tag[]).some(
                t => value.split(',').includes(t._id) && f(t)
              )
            )

          case 'SEARCH':
            const res = fz.filter(initial, value, {
              key: 'title',
              allowErrors: false
            })

            return res
        }
      }

      return {
        data,
        products: getProducts()
      }
    }
  }),
  withContext({ filter: func }, ({ setFilter: filter }) => ({ filter }))
)(({ products = [] }) => (
  <Box
    as="section"
    css={`
      display: grid;
      align-items: flex-start;
      grid-template-rows: min-content 1fr;
      grid-template-columns: 50% 50%;
      align-self: stretch;
      overflow: hidden;
      height: 100vh;
    `}>
    <Head>
      <title key="title">
        {products.length} results found :: {siteName}
      </title>
    </Head>

    <Box
      css={`
        grid-column: 1 / -1;
        grid-row: 1;
        align-self: initial;
        background: ${({ theme }) => theme.colours.module};
      `}>
      <Categories />
    </Box>

    <Box
      css={`
        grid-row: 2;
        align-self: inherit;
      `}>
      <Table
        data={orderBy(products, 'createdAt', 'asc').slice(0, 100)}
        columns={[
          {
            label: 'Price',
            key: 'price'
          },
          {
            label: 'Date',
            key: 'time'
          },
          {
            label: 'Name',
            key: 'title'
          },
          {
            label: '',
            key: 'image'
          }
        ]}
      />
    </Box>

    <Flex
      alignItems="center"
      css={`
        grid-row: 2;
        height: 100%;
        padding: var(--pad);
      `}>
      <Chart data={orderBy(products, 'createdAt', 'asc')} />
    </Flex>
  </Box>
))

interface HomeProps extends BoxProps {
  width?: number
  height?: number
  children?: React.ReactNode
}

export interface HomeState {
  initial?: Product[]
  products?: Product[]

  filter?: {
    value?: string
    action?: 'RESET' | 'TAG' | 'SEARCH'
  }
}

interface HomeStateHandlers extends StateHandlerMap<HomeState> {
  setFilter: StateHandler<HomeState>
}

export type DataTableFilter = (a: HomeState['filter']) => void
