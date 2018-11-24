import Box from '@/components/Box'
import { getFakeCrawl } from '@/lib/queries'
import { FakeCrawlResult } from '@/server/schema/types'
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

import Stats from './Stats'
import worker, { isWorkerReady } from './worker'

export default compose<TInner & TState & TStateHandles, TOutter>(
  setDisplayName('dashboard'),
  getFakeCrawl(),
  withStateHandlers<TState, TStateHandles, TInner>(
    ({ results }) => ({
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
      }) => ({
        filter: { value, action }
      }),

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
  withPropsOnChange<{}, TInner & TState>(
    ['filter'],
    ({ results, filter: { action, value } }) => {
      if (isWorkerReady()) {
        worker.postMessage([results, action, value])
      }

      return {}
    }
  )
)(({ renderedData, updateRendered }) => (
  <Box
    is="main"
    innerRef={() => {
      if (isWorkerReady()) {
        worker.onmessage = ({ data }) => updateRendered(data)
        worker.onerror = e => {
          throw e
        }
      }
    }}
    contain="style paint"
    height="calc(100vh - 50px)"
    overflow="auto">
    <Box
      is="section"
      gridRow={1}
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
      gridGap="var(--pad)"
      position="relative"
      overflow="auto"
      padding="var(--pad)">
      <>
        <Stats data={renderedData} float="right" gridColumn="1 / -1" />

        {renderedData.map((item, i) => (
          <Box is="article" key={item.id} elevation={2}>
            {item.title}
          </Box>
        ))}
      </>
    </Box>
  </Box>
))

interface TOutter {
  children?: React.ReactNode
}

interface TState {
  renderedData: FakeCrawlResult[]
  filter: {
    value?: string
    action?: 'RESET' | 'TAG' | 'SEARCH'
  }
}

interface TStateHandles extends StateHandlerMap<TState> {
  setFilter: StateHandler<TState>
}

interface TInner {
  results: TState['renderedData']
}

export type DataTableFilter = (a: TState['filter']) => void
