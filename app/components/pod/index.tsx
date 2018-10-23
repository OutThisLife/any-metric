import { getFakeCrawl } from '@/lib/queries'
import { FakeCrawlResult } from '@/server/schema/types'
import omit from 'lodash/omit'
import { func } from 'prop-types'
import { DataValue } from 'react-apollo'
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
    resultData: DataValue<{ fakeCrawl: FakeCrawlResult[] }>
  }

export default compose<TInner, TOutter>(
  setDisplayName('pod'),
  getFakeCrawl(),
  withStateHandlers<TState, TStateHandles, TInner>(
    ({ resultData: { fakeCrawl: data } }) => ({
      renderedData: data,
      filter: {
        value: '',
        action: 'RESET'
      }
    }),
    {
      setFilter: state => ({
        value = state.filter.value,
        action = state.filter.action
      }) => ({
        filter: { value, action }
      }),

      updateRendered: (_, { resultData: { fakeCrawl: data } }) => (
        renderedData = data
      ) => ({ renderedData })
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
    ({ resultData: { fakeCrawl: data }, filter: { action, value } }) => {
      if (isWorkerReady()) {
        worker.postMessage([data, action, value])
      }

      return {}
    }
  )
)(({ children, ...props }) => (
  <Pod
    {...omit(props, [
      'name',
      'resultData',
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
