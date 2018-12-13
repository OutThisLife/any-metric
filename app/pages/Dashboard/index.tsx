import Categories from '@/components/Categories'
import Chart, { Loader } from '@/components/Chart'
import Table from '@/components/Table'
import { getProducts } from '@/lib/queries'
import withStateHandlers from '@/lib/withStateHandlers'
import { Product } from '@/server/schema/types'
import { siteName } from '@/theme'
import { orderBy } from 'lodash'
import Head from 'next/head'
import { func, object } from 'prop-types'
import { Box, BoxProps, Flex } from 'rebass'
import {
  compose,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  withContext,
  withPropsOnChange
} from 'recompose'

import Home from './style'
import worker, { isWorkerReady } from './worker'

export default compose<HomeState & HomeProps & HomeStateHandlers, HomeProps>(
  setDisplayName('dashboard'),
  getProducts(),
  withStateHandlers(
    ({ products = [] }) => ({
      renderedData: products,
      sort: {
        name: 'date',
        dir: 'desc'
      },
      filter: {
        value: '',
        action: 'RESET'
      }
    }),
    {
      setFilter: ({ filter }) => ({
        value = filter.value,
        action = filter.action
      }) => ({ filter: { value, action } }),

      updateRendered: (_, { products }) => (
        renderedData: Product[] = products
      ) => ({
        renderedData
      }),

      sortBy: () => sort => ({ sort })
    }
  ),
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
  ),
  withPropsOnChange<any, HomeState & HomeState>(
    ['filter'],
    ({ products, filter: { action, value } }) =>
      isWorkerReady() && worker.postMessage([products, action, value])
  )
)(({ sort, products, renderedData, updateRendered }) => {
  if (isWorkerReady()) {
    worker.onmessage = ({ data }) => updateRendered(data)
  }

  return (
    <Home as="section">
      <Head>
        <title key="title">
          {renderedData.length} results found :: {siteName}
        </title>
      </Head>

      <Box
        css={`
          grid-area: table;
          align-self: inherit;
        `}>
        <Table
          data={orderBy(renderedData, sort.name, [sort.dir])}
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
          {products.length && <Categories />}
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
          {renderedData.length ? (
            <Chart data={orderBy(renderedData, 'date', 'asc')} />
          ) : (
            <Loader>Insufficient data</Loader>
          )}
        </Box>
      </Flex>
    </Home>
  )
})

interface HomeProps extends BoxProps {
  width?: number
  height?: number
  children?: React.ReactNode
}

export interface HomeState {
  products?: Product[]
  renderedData: Product[]

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
  updateRendered: StateHandler<HomeState>
}

export type DataTableFilter = (a: HomeState['filter']) => void
