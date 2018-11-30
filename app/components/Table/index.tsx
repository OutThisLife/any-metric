import withSelections, { select, SelectionsProps } from '@/lib/withSelections'
import * as d3 from 'd3'
import { array } from 'prop-types'
import { MeasuredComponentProps } from 'react-measure'
import { compose, setDisplayName, withContext, withHandlers } from 'recompose'

import Cols, { RenderColumns } from './Cols'
import Table from './Elements'

let tm: d3.Timer | {} = {}

export default compose<TableProps & TableOutterProps, TableOutterProps>(
  withSelections,
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
)(({ data = [], isDesktop, height, handleMouse, handleScroll }) => (
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
      height={height * 0.9}
      defaultHeight={50}
      onMouseDown={isDesktop ? handleMouse : () => null}
      onScroll={isDesktop ? handleScroll : () => null}>
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

export interface TableProps
  extends SelectionsProps,
    Partial<MeasuredComponentProps> {
  handleScroll?: React.UIEventHandler<HTMLElement>
}

export interface TableOutterProps {
  isDesktop?: boolean
  height: number
  data: any[]
  columns: Array<{
    label: string
    key: string
  }>
}
