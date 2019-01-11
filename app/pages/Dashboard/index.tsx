import Categories from '@/components/Categories'
import Chart from '@/components/Chart'
import Table from '@/components/Table'
import Watchlist from '@/components/Watchlist'
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

import Home from './style'

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
  <Home as="section">
    <Head>
      <title key="title">
        {products.length} results found :: {siteName}
      </title>
    </Head>

    <Box
      css={`
        grid-area: table;
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
            label: '',
            key: 'image'
          },
          {
            label: 'Name',
            key: 'title'
          },
          {
            label: 'Date',
            key: 'time'
          },
          {
            label: '',
            key: 'tags'
          }
        ]}
      />
    </Box>

    <Flex
      flexWrap="wrap"
      alignItems="flex-start"
      css={`
        grid-area: controls;

        @media (min-width: 1025px) {
          height: 100%;
          padding: 0 0 0 var(--pad);
        }
      `}>
      <Box
        as="section"
        css={`
          width: 100%;
        `}>
        <Watchlist />
        <Categories total={products.length} />
      </Box>

      <Box
        as="section"
        css={`
          width: 100%;

          @media (min-width: 1025px) {
            align-self: flex-end;
            margin: var(--pad) auto 0;
          }

          @media (max-width: 1025px) {
            align-self: center;
            margin: var(--pad);
          }
        `}>
        <Chart data={orderBy(products, 'createdAt', 'asc')} />
      </Box>
    </Flex>
  </Home>
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
