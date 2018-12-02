import Categories from '@/components/Categories'
import Chart from '@/components/Chart'
import Table from '@/components/Table'
import { getFakeCrawl } from '@/lib/queries'
import { FakeResult } from '@/server/schema/types'
import { omit, orderBy } from 'lodash'
import Head from 'next/head'
import { func, shape, string } from 'prop-types'
import { Box, BoxProps, Flex } from 'rebass'
import {
  compose,
  mapProps,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  withContext,
  withPropsOnChange,
  withStateHandlers
} from 'recompose'

import Home from './style'
import worker, { isWorkerReady } from './worker'

export default compose<HomeProps, HomeOutterProps>(
  getFakeCrawl(),
  withStateHandlers<HomeState, HomeStateHandlers, HomeProps>(
    ({ results = [] }) => ({
      renderedData: results,
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

      updateRendered: (_, { results }) => (
        renderedData: FakeResult[] = results
      ) => ({
        renderedData
      }),

      sortBy: () => sort => ({ sort })
    }
  ),
  withContext(
    {
      sort: shape({}),
      sortBy: func,
      filter: func,
      update: func,
      current: string
    },
    ({
      sort,
      sortBy,
      updateRendered: update,
      setFilter: filter,
      filter: { value: current }
    }) => ({
      sort,
      sortBy,
      update,
      filter,
      current
    })
  ),
  withPropsOnChange<any, HomeProps & HomeState>(
    ['filter'],
    ({ results, filter: { action, value } }) =>
      isWorkerReady() && worker.postMessage([results, action, value])
  ),
  mapProps(props => omit(props, ['sortBy', 'setFilter'])),
  setDisplayName('dashboard')
)(({ sort, results, renderedData, updateRendered, width, height }) => {
  const isDesktop = (width || 1920) > 1025

  if (isWorkerReady()) {
    worker.onmessage = ({ data }) => updateRendered(data)
  }

  return (
    <Home
      as="section"
      css={`
        display: grid;
        align-items: flex-start;
        grid-gap: inherit;
      `}>
      <Head>
        <title key="title">
          {renderedData.length} results found :: ɮΔքɦօʍɛ✞ʀɨƈ
        </title>
      </Head>

      <Box
        css={`
          grid-area: table;
          align-self: inherit;
        `}>
        <Table
          isDesktop={isDesktop}
          data={orderBy(renderedData, sort.name, [sort.dir])}
          height={
            isDesktop
              ? height
              : 'browser' in process
              ? window.innerHeight / 2
              : 400
          }
          columns={[
            {
              label: 'Product',
              key: 'title'
            },
            {
              label: 'Date',
              key: 'time'
            },
            {
              label: 'Status',
              key: 'status'
            },
            {
              label: 'Price',
              key: 'price'
            }
          ]}
        />
      </Box>

      <Flex
        flexWrap="wrap"
        alignItems="flex-start"
        css={`
          grid-area: controls;
          align-self: inherit;
        `}>
        <Box
          as="section"
          css={`
            width: 100%;
            padding: var(--pad) calc(var(--pad) / 2);
          `}>
          {results.length && (
            <Categories data={orderBy(results, 'date', 'asc')} />
          )}
        </Box>

        <Box
          as="section"
          css={`
            z-index: 10;
            align-self: flex-end;
            margin: 0;

            @media (max-width: 768px) {
              align-self: center;
              margin: var(--offset) auto 0;
            }
          `}>
          {renderedData && (
            <Chart
              data={orderBy(renderedData, 'date', 'asc')}
              isDesktop={isDesktop}
              width={isDesktop ? width / 2 - width / 15 : width / 1.5}
            />
          )}
        </Box>
      </Flex>
    </Home>
  )
})

type HomeProps = {
  results: HomeState['renderedData']
} & HomeState &
  HomeOutterProps &
  HomeStateHandlers

interface HomeOutterProps extends BoxProps {
  width?: number
  height?: number
  children?: React.ReactNode
}

export interface HomeState {
  renderedData: FakeResult[]

  sort: {
    name?: string
    dir?: 'asc' | 'desc'
  }

  filter: {
    value?: string
    action?: 'RESET' | 'TAG' | 'SEARCH'
  }
}

interface HomeStateHandlers extends StateHandlerMap<HomeState> {
  setFilter: StateHandler<HomeState>
}

export type DataTableFilter = (a: HomeState['filter']) => void
