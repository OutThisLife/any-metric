import Box from '@/components/Box'
import Categories from '@/components/Categories'
import PriceChart from '@/components/Charts/Price'
import Table from '@/components/Table'
import { getFakeCrawl } from '@/lib/queries'
import { FakeResult } from '@/server/schema/types'
import { func, string } from 'prop-types'
import {
  compose,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  withContext,
  withPropsOnChange,
  withStateHandlers
} from 'recompose'

import worker, { isWorkerReady } from './worker'

export default compose<HomeProps, HomeOutterProps>(
  getFakeCrawl(),
  withStateHandlers<HomeState, HomeStateHandlers, HomeProps>(
    ({ results = [] }) => ({
      renderedData: results,
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
      updateRendered: (_, { results }) => (renderedData = results) => ({
        renderedData
      })
    }
  ),
  withContext(
    { filter: func, update: func, current: string },
    ({
      updateRendered: update,
      setFilter: filter,
      filter: { value: current }
    }) => ({
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
)(({ renderedData, updateRendered }) => {
  if (isWorkerReady()) {
    worker.onmessage = ({ data }) => updateRendered(data)
    worker.onerror = e => {
      throw e
    }
  }

  return (
    <Box
      is="section"
      display="grid"
      gridTemplateColumns="repeat(40, 1fr)"
      alignItems="flex-start"
      width="auto"
      height="calc(100% - var(--offset))"
      overflow="auto"
      marginY="var(--pad)"
      padding="var(--pad)"
      paddingBottom={0}>
      <Box
        gridRow={1}
        gridColumn="23 / -1"
        display="flex"
        flexWrap="wrap"
        alignItems="flex-start"
        height="100%">
        <Box is="section" display="block" width="100%" paddingX="var(--offset)">
          <Categories />
        </Box>

        <Box
          is="section"
          zIndex={10}
          display="block"
          position="relative"
          width="100%"
          alignSelf="flex-end"
          marginBottom="var(--pad)">
          <PriceChart data={renderedData} />
        </Box>
      </Box>

      <Box gridRow={1} gridColumn="1 / 23" height="100%">
        <Table data={renderedData} />
      </Box>
    </Box>
  )
})

interface HomeOutterProps {
  children?: React.ReactNode
}

interface HomeState {
  renderedData: FakeResult[]
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
