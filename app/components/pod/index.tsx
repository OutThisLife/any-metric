import { getFakeCrawl } from '@/lib/queries'
import { FakeCrawlResult } from '@/server/schema/types'
import omit from 'lodash/omit'
import { func } from 'prop-types'
import {
  compose,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  withContext,
  withHandlers,
  withPropsOnChange,
  withStateHandlers
} from 'recompose'

import Inner from './inner'
import Pod from './style'
import { isWorkerReady, worker } from './worker'

interface TOutter {
  name: string
  children?: React.ReactNode
  className?: string
}

interface DataFilterArgs {
  value?: string
  action?: 'RESET' | 'TAG' | 'SEARCH'
}

interface TState {
  filter: DataFilterArgs
  renderedData: FakeCrawlResult[]
}

interface TStateHandles extends StateHandlerMap<TState> {
  setFilter: StateHandler<TState>
}

export type DataTableFilter = (args: DataFilterArgs) => void

export type TInner = TState &
  TStateHandles &
  TOutter & {
    results: FakeCrawlResult[]
  }

export default compose<TInner, TOutter>(
  setDisplayName('pod'),
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
  withHandlers(() => ({
    onRef: ({ updateRendered }) => ref => {
      if (!(ref && isWorkerReady())) {
        return
      }

      worker.onmessage = ({ data }) => updateRendered(data)
      worker.onerror = e => {
        throw e
      }
    }
  })),
  withContext(
    { filter: func, update: func },
    ({ updateRendered: update, setFilter: filter }) => ({
      update,
      filter
    })
  ),
  withPropsOnChange<{}, TInner>(
    ['filter'],
    ({ results, filter: { action, value } }) => {
      if (isWorkerReady()) {
        worker.postMessage([results, action, value])
      }

      return {}
    }
  )
)(({ children, ...props }) => (
  <Pod
    {...omit(props, [
      'name',
      'results',
      'data',
      'renderedData',
      'updateRendered',
      'onRef',
      'setFilter',
      'filter'
    ])}>
    {children}
    <Inner {...props} />
  </Pod>
))
