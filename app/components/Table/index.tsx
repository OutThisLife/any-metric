import { Product } from '@/server/schema/types'
import { MeasuredComponentProps, withContentRect } from 'react-measure'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'

import * as Columns from './Columns'
import * as Table from './style'

export default compose<TableState & TableProps, TableProps>(
  setDisplayName('table'),
  withContentRect('bounds'),
  withState('visible', 'setVisible', []),
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
)(({ measureRef, contentRect, columns, data }) => (
  <div
    ref={measureRef}
    style={{ height: ' calc(100vh - (var(--offset) * 2))' }}>
    <Table.Container
      width="100%"
      height={
        isNaN(contentRect.bounds.height) ? 500 : contentRect.bounds.height
      }
      itemCount={data.length}
      itemSize={80}
      onItemsRendered={() =>
        'browser' in process &&
        [].slice
          .call(document.querySelectorAll('img[data-src]:not([src]'))
          .forEach((el: HTMLElement) =>
            window.requestAnimationFrame(() =>
              el.setAttribute('src', el.getAttribute('data-src'))
            )
          )
      }
      renderItem={({ index, style }) => (
        <Table.Row
          key={data[index]._id}
          id={data[index]._id}
          style={style}
          css={`
            grid-template-columns: ${columns
              .map(c =>
                typeof c.width === 'number' ? `${c.width}px` : c.width
              )
              .join(' ')};

            @media (max-width: 768px) {
              grid-template-columns: repeat(${columns.length}, 1fr);
            }
          `}>
          <RenderColumns
            columns={columns}
            props={() => ({ item: data[index] })}
          />
        </Table.Row>
      )}
    />
  </div>
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
