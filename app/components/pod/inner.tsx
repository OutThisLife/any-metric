import DataTable from '@/components/table'
import { flatten } from '@/lib/utils'
import { Pane } from 'evergreen-ui'
import { func } from 'prop-types'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { compose, shouldUpdate, withContext, withState } from 'recompose'

import { TInner as TOutter } from '.'
import Nav from './nav'
import Stats from './stats'
import { Inner } from './style'
import Title from './title'

interface TInner {
  showStats: boolean
  toggleStats: (b: boolean) => void
}

export default compose<TInner & TOutter, TOutter>(
  DragDropContext(HTML5Backend),
  shouldUpdate<TOutter>(
    (_, nextProps) => !/(resizing|dragging)/.test(nextProps.className)
  ),
  withState('showStats', 'toggleStats', true),
  withContext<{}, TInner>(
    {
      toggleStats: func
    },
    ({ toggleStats }) => ({ toggleStats })
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
          <Pane>
            <Stats />
          </Pane>
        )}
        <DataTable initialData={renderedData} />
      </section>
    </Inner>
  )
)
