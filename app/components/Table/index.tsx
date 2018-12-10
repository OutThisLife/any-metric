import { Product } from '@/server/schema/types'
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

export default compose<TableState & TableProps, TableProps>(
  setDisplayName('table'),
  withContext({ columns: array }, ({ columns }) => ({ columns })),
  withHandlers<{}, TableState>(() => ({
    handleContextMenu: () => e => {
      e.preventDefault()

      const $row = (e.target as HTMLElement).closest('tr')

      if ($row instanceof HTMLTableRowElement) {
        const $a: HTMLLinkElement = $row.querySelector('[class*="menu-"]')
        $a.closest('td').focus()
        $a.click()
      }
    },

    handleScroll: () => ({ currentTarget }) => {
      const el = currentTarget.firstChild.firstChild as HTMLElement
      el.style.pointerEvents = 'none'

      if ('stop' in tm) {
        tm.stop()
      }

      tm = d3.timeout(() => (el.style.pointerEvents = 'auto'), 300)
    }
  }))
)(({ columns, data, handleContextMenu, handleScroll, ...props }) => (
  <Box
    css={`
      overflow: auto;

      @media (min-width: 1025px) {
        height: calc(100vh - (var(--offset) * 2.25));
      }

      @media (max-width: 768px) {
        max-width: 100%;
        overflow: auto;
      }
    `}>
    <Table.Container
      as="table"
      css={`
        grid-template-columns: ${columns
          .map(c => (typeof c.width === 'number' ? `${c.width}px` : c.width))
          .join(' ')};
      `}
      onContextMenu={handleContextMenu}
      {...props}>
      <Table.Head>
        <RenderColumns props={c => ({ children: c.label })} />
      </Table.Head>

      <Table.Body onScroll={handleScroll}>
        {data.map(d => (
          <Table.Row key={d.createdAt.valueOf()} id={d._id}>
            <RenderColumns props={() => ({ item: d })} />
          </Table.Row>
        ))}

        <tr>
          <td
            colSpan={columns.length}
            style={{ height: 'calc(var(--offset) * 1.5)' }}
          />
        </tr>
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

export interface TableState extends Partial<MeasuredComponentProps> {
  handleScroll?: React.UIEventHandler<HTMLElement>
  handleContextMenu?: React.UIEventHandler<HTMLElement>
}

export interface TableProps {
  data: Product[]
  columns: Array<{
    label: string
    key: string
    width: number | string
  }>
}

export interface RenderColumnProps {
  columns?: TableProps['columns']
  props: (c: any) => { [key: string]: any }
}
