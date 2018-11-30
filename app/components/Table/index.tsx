import withSelections, { select, SelectionsProps } from '@/lib/withSelections'
import * as d3 from 'd3'
import { array } from 'prop-types'
import { fitDimensions } from 'react-stockcharts/lib/helper'
import { compose, setDisplayName, withContext, withHandlers } from 'recompose'

import Cols, { RenderColumns } from './Cols'
import Table from './Table'

let tm: d3.Timer | {} = {}

export default compose<TableProps & TableOutterProps, TableOutterProps>(
  withSelections,
  fitDimensions,
  withHandlers<{}, TableProps>(() => ({
    handleScroll: () => ({ currentTarget }) => {
      const el = currentTarget.firstChild.firstChild as HTMLElement
      el.style.pointerEvents = 'none'

      if ('stop' in tm) {
        tm.stop()
      }

      tm = d3.timeout(() => (el.style.pointerEvents = 'auto'), 300)
    }
  })),
  withContext({ columns: array }, ({ columns }) => ({ columns })),
  setDisplayName('table')
)(({ data = [], handleMouse, handleScroll, height }) => (
  <Table>
    <Table.Head>
      <Cols.Check
        disableSort
        checkboxProps={{
          name: 'checked',
          value: 'all',
          onClick: ({ target }) =>
            [].slice
              .call(document.getElementsByName(target.name))
              .forEach(select)
        }}
      />

      <RenderColumns props={c => ({ children: c.label })} />
    </Table.Head>

    <Table.Body
      height={height}
      defaultHeight={50}
      onMouseDown={handleMouse}
      onScroll={handleScroll}
      overscanCount={50}>
      {data.map(d => (
        <Table.Row key={d.id} id={d.id} height={52}>
          <Cols.Check
            checkboxProps={{
              pointerEvents: 'none',
              name: 'checked',
              value: d.id
            }}
          />

          <RenderColumns props={() => ({ item: d })} />
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
))

export interface TableProps extends SelectionsProps {
  height?: number
  handleScroll?: React.UIEventHandler<HTMLElement>
}

export interface TableOutterProps {
  data?: any[]
  columns: Array<{
    label: string
    key: string
  }>
}
