import { Product } from '@/server/schema/types'
import * as d3 from 'd3'
import { array } from 'prop-types'
import { MeasuredComponentProps, withContentRect } from 'react-measure'
import { Box } from 'rebass'
import {
  compose,
  getContext,
  setDisplayName,
  withContext,
  withHandlers,
  withState
} from 'recompose'

import * as Columns from './Columns'
import * as Table from './style'

const tm: d3.Timer | {} = {}

export default compose<TableState & TableProps, TableProps>(
  setDisplayName('table'),
  withState('visible', 'setVisible', []),
  withContext({ columns: array }, ({ columns }) => ({ columns })),
  withContentRect('bounds'),
  withHandlers<TableProps & TableState, TableState>(({ setVisible }) => ({
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

    onRef: ({ data = [] }) => ref => {
      if ('stop' in tm) {
        tm.stop()
      }

      if (!(ref || data.length)) {
        return
      }

      const el = document.getElementById('data-table') as HTMLElement
      const scroll = el.firstElementChild as HTMLElement
      const table = scroll.firstElementChild as HTMLTableElement
      const row = document.getElementById('vsize').firstElementChild

      const h = row.clientHeight

      table.style.position = 'absolute'
      table.style.top = '0px'
      table.style.right = '0px'
      table.style.bottom = '0px'
      table.style.left = '0px'
      scroll.style.position = 'relative'
      scroll.style.height = `${(data.length * h) / 2}px`

      const handleScroll = () => {
        const rowCount = (el.clientHeight * 1.5) / h
        const start = el.scrollTop / h

        console.log(rowCount)

        const end = Math.min(data.length, start + rowCount)
        setVisible(data.slice(start, end))
      }

      window.requestAnimationFrame(handleScroll)
      el.addEventListener('scroll', handleScroll)
    }
  }))
)(({ onRef, columns, visible: data, handleContextMenu }) => (
  <Box
    id="data-table"
    ref={onRef}
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
    <div>
      <Table.Container
        as="table"
        onContextMenu={handleContextMenu}
        css={`
          grid-template-columns: ${columns
            .map(c => (typeof c.width === 'number' ? `${c.width}px` : c.width))
            .join(' ')};

          @media (max-width: 768px) {
            grid-template-columns: repeat(${columns.length}, 1fr);
          }
        `}>
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

          <Table.Row id="vsize">
            <td
              style={{
                gridColumn: '1 / -1',
                padding: 'calc(var(--pad) * 2)'
              }}
            />
          </Table.Row>
        </Table.Body>
      </Table.Container>
    </div>
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
  visible?: Product[]
  setVisible?: (a: Product[]) => void
  onRef?: React.UIEventHandler<HTMLElement>
  handleContextMenu?: React.UIEventHandler<HTMLElement>
}

export interface TableProps {
  onRef?: (ref: HTMLElement) => void
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
