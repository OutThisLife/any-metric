import Box, { BoxProps } from '@/components/Box'
import Categories from '@/components/Categories'
import PriceChart from '@/components/Charts/Price'
import { getFakeCrawl } from '@/lib/queries'
import { FakeResult } from '@/server/schema/types'
import { orderBy } from 'lodash'
import { func, shape, string } from 'prop-types'
import {
  compose,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  withContext,
  withPropsOnChange,
  withStateHandlers
} from 'recompose'

import DataTable from './DataTable'
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
  withPropsOnChange<{}, HomeProps & HomeState>(
    ['filter'],
    ({ results, filter: { action, value } }) => {
      if (isWorkerReady()) {
        worker.postMessage([results, action, value])
      }

      return {}
    }
  ),
  setDisplayName('dashboard')
)(({ sort, renderedData, updateRendered }) => {
  if (isWorkerReady()) {
    worker.onmessage = ({ data }) => updateRendered(data)
    worker.onerror = e => {
      throw e
    }
  }

  return (
    <Home
      is="section"
      gridArea="main"
      display="grid"
      gridTemplate="'table controls'"
      alignItems="flex-start"
      gridGap="inherit">
      <Box gridArea="table">
        <DataTable data={orderBy(renderedData, sort.name, [sort.dir])} />
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="flex-start"
        gridArea="controls">
        <Box is="section" width="100%">
          <Categories />
        </Box>

        <Box
          is="section"
          zIndex={10}
          alignSelf="flex-end"
          width="100%"
          minHeight="40%">
          <PriceChart data={orderBy(renderedData, 'date', 'asc')} />
        </Box>
      </Box>
    </Home>
  )
})

interface HomeOutterProps extends BoxProps<HTMLDivElement> {
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

type HomeProps = {
  results: HomeState['renderedData']
} & HomeState &
  HomeStateHandlers

export type DataTableFilter = (a: HomeState['filter']) => void
