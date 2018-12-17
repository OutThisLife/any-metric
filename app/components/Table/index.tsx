import { Product } from '@/server/schema/types'
import { MeasuredComponentProps, withContentRect } from 'react-measure'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers } from 'recompose'

import * as Columns from './Columns'
import Table from './style'

let tm

export default compose<TableState & TableProps, TableProps>(
  setDisplayName('table'),
  withContentRect('bounds'),
  withHandlers<TableProps & TableState, TableState>(() => ({
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
  }))
)(({ measureRef, contentRect, columns, data, handleContextMenu }) => (
  <div
    ref={measureRef}
    style={{ height: ' calc(100vh - (var(--offset) * 3))' }}
    onContextMenu={handleContextMenu}>
    <Table
      width="100%"
      height={
        isNaN(contentRect.bounds.height) ? 500 : contentRect.bounds.height
      }
      itemCount={data.length}
      itemSize={() => {
        if ('browser' in process && window.innerWidth <= 1500) {
          return 80 * 2
        }

        return 80
      }}
      onScroll={(_, e) => {
        clearTimeout(tm)
        e.target.classList.add('scrolling')
        tm = setTimeout(() => e.target.classList.remove('scrolling'), 250)
      }}
      renderItem={({ index, style }) => (
        <Box
          as="article"
          key={data[index]._id}
          id={data[index]._id}
          style={style}>
          <RenderColumns
            columns={columns}
            props={() => ({ item: data[index] })}
          />
        </Box>
      )}
    />
  </div>
))

export const RenderColumns = compose<RenderColumnProps, RenderColumnProps>(
  setDisplayName('render-columns')
)(({ props, columns = [] }) => (
  <>
    {columns.map(c => {
      const C = Columns[c.key.slice(0, 1).toUpperCase() + c.key.slice(1)]
      return <C key={c.key} {...props(c)} />
    })}
  </>
))

export interface TableState extends Partial<MeasuredComponentProps> {
  handleContextMenu?: React.MouseEventHandler<any>
}

export interface TableProps {
  onRef?: (ref: HTMLElement) => void
  data: Product[]
  columns: Array<{
    label: string
    key: string
  }>
}

export interface RenderColumnProps {
  columns?: TableProps['columns']
  props: (c: any) => { [key: string]: any }
}
