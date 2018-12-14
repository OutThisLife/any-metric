import { Product } from '@/server/schema/types'
import * as d3 from 'd3'
import { array } from 'prop-types'
import { MeasuredComponentProps, withContentRect } from 'react-measure'
import { Box } from 'rebass'
import {
  compose,
  getContext,
  lifecycle,
  setDisplayName,
  withContext,
  withHandlers
} from 'recompose'

import * as Columns from './Columns'
import * as Table from './style'

let tm: d3.Timer | {} = {}

const getObserver = () =>
  'browser' in process &&
  new IntersectionObserver(
    entries => {
      console.log(entries)
      for (let i = 0, l = entries.length; i < l; i++) {
        const e = entries[i]
        const isVisible = e.intersectionRatio > 0

        const $row = (e.target as HTMLElement).parentElement

        $row.style.visibility = isVisible ? 'inherit' : 'hidden'
        $row.style.pointerEvents = isVisible ? 'inherit' : 'none'
        ;[].slice
          .call($row.querySelectorAll('[data-src]'))
          .forEach($im =>
            isVisible ? ($im.src = $im.dataset.src) : $im.removeAttribute('src')
          )
      }
    },
    {
      root: document.getElementById('data-table'),
      threshold: 0.25
    }
  )

const observeRows = (observer: IntersectionObserver) =>
  'browser' in process &&
  [].slice
    .call(document.querySelectorAll('tr > td'))
    .forEach(el => observer.observe(el))

export default compose<TableState & TableProps, TableProps>(
  setDisplayName('table'),
  withContext({ columns: array }, ({ columns }) => ({ columns })),
  withContentRect('bounds'),
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
  })),
  lifecycle({
    componentDidMount() {
      observeRows(getObserver())
    }
  })
)(({ columns, data, handleContextMenu, handleScroll, ...props }) => (
  <Box
    id="data-table"
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

        @media (max-width: 768px) {
          grid-template-columns: repeat(${columns.length}, 1fr);
        }
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
