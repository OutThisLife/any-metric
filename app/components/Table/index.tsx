import { Product } from '@/server/schema/types'
import * as d3 from 'd3'
import { array } from 'prop-types'
import { MeasuredComponentProps, withContentRect } from 'react-measure'
import { Box } from 'rebass'
import {
  compose,
  getContext,
  pure,
  setDisplayName,
  withContext,
  withHandlers,
  withState
} from 'recompose'

import * as Columns from './Columns'
import * as Table from './style'

let tm: d3.Timer | any = {}

export default compose<TableState & TableProps, TableProps>(
  setDisplayName('table'),
  withState('visible', 'setVisible', []),
  withContext({ columns: array }, ({ columns }) => ({ columns })),
  withContentRect('bounds'),
  withHandlers<TableProps & TableState, TableState>(({ setVisible }) => ({
    handleContextMenu: () => e => {
      e.preventDefault()

      const $row = (e.target as HTMLElement).closest('article')

      if ($row instanceof HTMLTableRowElement) {
        const $a = $row.querySelector('[class*="menu-"]')

        if ($a instanceof HTMLAnchorElement) {
          $a.closest('div').focus()
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
      const $scroll = el.firstElementChild as HTMLElement
      const avg = 80

      el.style.position = 'relative'
      el.style.overflow = 'auto'

      $scroll.style.position = 'relative'
      $scroll.style.height = `${data.length * avg}px`
      $scroll.style.maxHeight = $scroll.style.height
      $scroll.style.overflow = 'hidden'

      tm = d3.timer(() => {
        setVisible(
          data.slice(
            el.scrollTop / avg,
            Math.min(data.length, el.scrollTop / avg + el.clientHeight / avg)
          )
        )

        d3.selectAll('article').style('top', (_, i, $rows) => {
          const $r = $rows[i] as HTMLElement
          const $prev = $r.previousElementSibling

          let y = el.scrollTop

          if ($prev instanceof HTMLElement) {
            y = $prev.clientHeight + $prev.offsetTop
          }

          const $im = $r.querySelector('[data-src]')

          if ($im instanceof HTMLElement) {
            const src = $im.getAttribute('data-src')
            $im.setAttribute('src', src)
            $im.nextElementSibling.setAttribute('src', src)
          }

          return `${y}px`
        })
      })
    }
  })),
  pure
)(({ onRef, columns, visible: data, handleContextMenu }) => (
  <Box
    id="data-table"
    ref={onRef}
    onContextMenu={handleContextMenu}
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
      css={`
        article {
          display: grid;
          position: absolute;
          left: 0;
          right: 0;

          grid-template-columns: ${columns
            .map(c => (typeof c.width === 'number' ? `${c.width}px` : c.width))
            .join(' ')};

          @media (max-width: 768px) {
            grid-template-columns: repeat(${columns.length}, 1fr);
          }
        }
      `}>
      {data.length ? (
        data.map(d => (
          <Table.Row key={d._id} id={d._id}>
            <RenderColumns props={() => ({ item: d })} />
          </Table.Row>
        ))
      ) : (
        <Table.Row className="row">
          <article
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              justifyContent: 'center',
              padding: 'var(--pad)'
            }}>
            ¯\_(ツ)_/¯
          </article>
        </Table.Row>
      )}

      <Table.Row>
        <article
          id="vsize"
          style={{
            gridColumn: '1 / -1',
            padding: 'calc(var(--pad) * 2)'
          }}
        />
      </Table.Row>
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
