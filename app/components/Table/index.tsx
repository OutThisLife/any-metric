import withSelections, { SelectionsProps } from '@/lib/withSelections'
import { FakeResult } from '@/server/schema/types'
import * as d3 from 'd3'
import { array } from 'prop-types'
import { MeasuredComponentProps } from 'react-measure'
import { Box } from 'rebass'
import {
  compose,
  getContext,
  setDisplayName,
  withContext,
  withHandlers
} from 'recompose'

import * as Columns from './Columns'
import * as Table from './style'

let tm: d3.Timer | {} = {}

export default compose<TableProps & TableOutterProps, TableOutterProps>(
  withSelections,
  withContext({ columns: array }, ({ columns }) => ({ columns })),
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
  setDisplayName('table')
)(({ data = [], isDesktop, handleMouse, handleScroll, ...props }) => (
  <Box
    css={`
      height: calc(100vh - (var(--offset) * 4));
      overflow: auto;
    `}>
    <Table.Container
      as="table"
      cellPadding="0"
      cellSpacing="0"
      cellBorder="0"
      {...props}>
      <Table.Head>
        <Columns.Check>&nbsp;</Columns.Check>
        <RenderColumns props={c => ({ children: c.label })} />
      </Table.Head>

      <Table.Body
        onMouseDown={isDesktop ? handleMouse : () => null}
        onScroll={isDesktop ? handleScroll : () => null}>
        {(data as FakeResult[]).map(d => (
          <Table.Row key={d.date.valueOf()} id={d.id}>
            <Columns.Check />
            <RenderColumns props={() => ({ item: d })} />
          </Table.Row>
        ))}

        <Table.Row>
          <td style={{ height: '100%' }} />
        </Table.Row>
      </Table.Body>
    </Table.Container>
  </Box>
))

export const RenderColumns = compose<RenderColumnProps, RenderColumnProps>(
  setDisplayName('render-columns'),
  getContext({ columns: array })
)(({ props, columns = [] }) => (
  <>
    {columns.map(c => {
      const C =
        Columns[c.key.slice(0, 1).toUpperCase() + c.key.slice(1)] ||
        Columns.Base

      return <C key={c.key} {...props(c)} />
    })}
  </>
))

export interface TableProps
  extends SelectionsProps,
    Partial<MeasuredComponentProps> {
  handleScroll?: React.UIEventHandler<HTMLElement>
}

export interface TableOutterProps {
  isDesktop?: boolean
  data: any[]
  columns: Array<{
    label: string
    key: string
  }>
}

export interface RenderColumnProps {
  columns?: TableOutterProps['columns']
  props: (c: any) => { [key: string]: any }
}
