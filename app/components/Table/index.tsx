import { Product } from '@/server/schema/types'
import * as d3 from 'd3'
import { MeasuredComponentProps } from 'react-measure'
import { Box } from 'rebass'
import {
  compose,
  lifecycle,
  setDisplayName,
  withHandlers,
  withState
} from 'recompose'

import * as Columns from './Columns'
import * as Table from './style'

let tm: d3.Timer | any = {}

export default compose<TableState & TableProps, TableProps>(
  setDisplayName('table'),
  withState('visible', 'setVisible', []),
  withHandlers<TableProps & TableState, TableState>(({ setVisible }) => ({
    virtualize: ({ data = [] }) => () => {
      if ('stop' in tm) {
        tm.stop()
      }

      if (!data.length) {
        return
      }

      const el = document.getElementById('data-table') as HTMLElement
      const $scroll = el.firstElementChild as HTMLElement
      const heightMap = [80]
      const getAverage = () =>
        heightMap.reduce((a, n) => a + n, 0) / heightMap.length

      const handleResize = () => {
        el.style.position = 'relative'
        el.style.overflow = 'auto'

        $scroll.style.position = 'relative'
        $scroll.style.height = `${data.length * getAverage()}px`
        $scroll.style.maxHeight = $scroll.style.height
        $scroll.style.overflow = 'hidden'
      }

      window.requestAnimationFrame(handleResize)

      tm = d3.timer(() => {
        const avg = getAverage()
        const start = el.scrollTop / avg
        const end = parseInt(
          Math.min(data.length, start + el.clientHeight / avg).toFixed(0),
          10
        )

        setVisible(data.slice(start, end))

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

          heightMap[i] = $r.clientHeight

          return `${y}px`
        })
      })

      window.addEventListener('resize', handleResize)
    },

    handleContextMenu: () => e => {
      e.preventDefault()

      const $row = (e.target as HTMLElement).closest('article')

      if ($row instanceof HTMLElement) {
        const $a = $row.querySelector('[class*="menu-"]')

        if ($a instanceof HTMLAnchorElement) {
          ;($a.closest('[tabindex]') as HTMLElement).focus()
          $a.click()
        }
      }
    }
  })),
  lifecycle<TableProps, {}>({
    componentDidMount() {
      window.requestAnimationFrame(this.props.virtualize)
    }
  })
)(({ columns, visible: data, handleContextMenu }) => (
  <Box
    id="data-table"
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
            <RenderColumns columns={columns} props={() => ({ item: d })} />
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
  setDisplayName('render-columns')
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
  virtualize?: () => void
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
