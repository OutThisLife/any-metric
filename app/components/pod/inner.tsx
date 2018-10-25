import DataTable from '@/components/table'
import { flatten } from '@/lib/utils'
import { bool, func } from 'prop-types'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {
  compose,
  shouldUpdate,
  StateHandler,
  StateHandlerMap,
  withContext,
  withStateHandlers
} from 'recompose'

import { TInner as TOutter } from '.'
import Nav from './nav'
import Stats from './stats'
import { Inner } from './style'
import Title from './title'

interface TState {
  showStats: boolean
}

interface TStateHandlers extends StateHandlerMap<TState> {
  toggleStats: StateHandler<TState>
}

export default compose<TState & TOutter, TOutter>(
  DragDropContext(HTML5Backend),
  shouldUpdate<TOutter>(
    (_, nextProps) => !/(resizing|dragging)/.test(nextProps.className)
  ),
  withStateHandlers<TState, TStateHandlers>(
    {
      showStats: false
    },
    {
      toggleStats: ({ showStats }) => () => ({ showStats: !showStats })
    }
  ),
  withContext<{}, TStateHandlers>(
    {
      showStats: bool,
      toggleStats: func
    },
    ({ showStats, toggleStats }) => ({ showStats, toggleStats })
  )
)(
  ({
    onRef,
    name,
    resultData: { fakeCrawl: data },
    renderedData,
    filter,
    showStats
  }) => (
    <Inner innerRef={onRef}>
      <Title title={name} />

      <Nav
        current={filter.action === 'TAG' ? filter.value : ''}
        tags={flatten(data, 'tags').sort()}
      />

      <section>
        {showStats && (
          <Stats current={filter.action === 'TAG' ? filter.value : ''} />
        )}
        <DataTable initialData={renderedData} />
      </section>
    </Inner>
  )
)
