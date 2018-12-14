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
        const $a = $row.querySelector('[class*="menu-"]')

        if ($a instanceof HTMLAnchorElement) {
          $a.closest('td').focus()
          $a.click()
        }
      }
    },

    handleScroll: () => () => {
      const el = document.querySelector('table')

      el.style.pointerEvents = 'none'

      if ('stop' in tm) {
        tm.stop()
      }

      tm = d3.timeout(() => (el.style.pointerEvents = 'auto'), 300)
    }
  }))
)(({ columns, data, handleContextMenu, handleScroll, ...props }) => (
  <Box
    onScroll={handleScroll}
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

      <Table.Body>
        {data.length ? (
          data.map(d => (
            <Table.Row key={d._id} id={d._id}>
              <RenderColumns props={() => ({ item: d })} />
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <td
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                justifyContent: 'center',
                padding: 'var(--pad)'
              }}>
              ¯\_(ツ)_/¯
            </td>
          </Table.Row>
        )}
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
    skey?: string
    width: number | string
  }>
}

export interface RenderColumnProps {
  columns?: TableProps['columns']
  props: (c: any) => { [key: string]: any }
}
