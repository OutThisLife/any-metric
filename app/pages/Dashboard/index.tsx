import Categories from '@/components/Categories'
import Chart, { Loader } from '@/components/Chart'
import Table from '@/components/Table'
import { GET_PRODUCTS } from '@/lib/queries'
import { Product, Tag } from '@/server/schema/types'
import { siteName } from '@/theme'
import { orderBy } from 'lodash'
import Head from 'next/head'
import { func, object } from 'prop-types'
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
  graphql<HomeState & HomeProps & HomeStateHandlers, { products: Product[] }>(
    GET_PRODUCTS,
    {
      props: ({
        data: { products: initial = [], ...data },
        ownProps: {
          filter: { action, value }
        }
      }) => ({
        data,
        products: (() => {
          switch (action) {
            default:
              return initial

            case 'TAG':
              return initial.filter(d =>
                (d.tags as Tag[]).some(t => value.split(',').includes(t._id))
              )
          }
        })()
      })
    }
  ),
  withState('sort', 'sortBy', {
    name: 'date',
    dir: 'desc'
  }),
  withContext(
    {
      sort: object,
      sortBy: func,
      filter: func
    },
    ({ sort, sortBy, setFilter: filter }) => ({
      sort,
      sortBy,
      filter
    })
  )
)(({ sort, products }) => (
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
        data={orderBy(products, sort.name, [sort.dir])}
        columns={[
          {
            label: 'Price',
            key: 'price',
            width: 'min-content'
          },
          {
            label: '',
            key: 'image',
            width: 80
          },
          {
            label: 'Name',
            key: 'title',
            width: '2fr'
          },
          {
            label: 'Date',
            key: 'time',
            width: '0.33fr'
          },
          {
            label: 'State',
            key: 'status',
            width: '0.33fr'
          },
          {
            label: '',
            key: 'tags',
            width: 'max-content'
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
        <Categories />
      </Box>

      <Box
        as="section"
        css={`
          @media (min-width: 1025px) {
            align-self: flex-end;
            width: 100%;
            margin: var(--pad) auto 0;
          }

          @media (max-width: 1025px) {
            display: none;
          }
        `}>
        {products ? (
          <Chart data={orderBy(products, 'date', 'asc')} />
        ) : (
          <Loader>Insufficient data</Loader>
        )}
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
  products?: Product[]

  sort: {
    name?: string
    dir?: 'asc' | 'desc'
  }

  filter: {
    value?: string
    action?: 'RESET' | 'TAG'
  }
}

interface HomeStateHandlers extends StateHandlerMap<HomeState> {
  setFilter: StateHandler<HomeState>
}

export type DataTableFilter = (a: HomeState['filter']) => void
