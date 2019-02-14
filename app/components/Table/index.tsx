import withHotkeys from '@/lib/withHotkeys'
import { Product } from '@/server/schema/types'
import { MeasuredComponentProps, withContentRect } from 'react-measure'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import * as Columns from './Columns'
import Table from './style'

export default compose<TableState & TableProps, TableProps>(
  setDisplayName('table'),
  withContentRect('bounds'),
  withHotkeys([
    {
      key: 70, // F
      action: () => {
        const $row = document.querySelector('article.active-row')

        if ($row instanceof HTMLElement) {
          ;($row.querySelector('.favourite') as HTMLElement).click()
        }
      }
    },
    {
      key: 34, // PgDn
      action: () =>
        (document.getElementById('data-table').scrollTop +=
          window.innerWidth / 5)
    },
    {
      key: 33, // PgUp
      action: () =>
        (document.getElementById('data-table').scrollTop -=
          window.innerWidth / 5)
    },
    {
      key: 40, // ArrDn
      action: () => (document.getElementById('data-table').scrollTop += 95)
    },
    {
      key: 38, // ArrUp
      action: () => (document.getElementById('data-table').scrollTop -= 95)
    },
    {
      key: 35, // End
      action: () => (document.getElementById('data-table').scrollTop = 10e10)
    },
    {
      key: 36, // Home
      action: () => (document.getElementById('data-table').scrollTop = 0)
    }
  ])
)(({ measureRef, contentRect, columns, data }) => (
  <div ref={measureRef} style={{ height: '100vh' }}>
    <Table
      id="data-table"
      width="100%"
      height={
        isNaN(contentRect.bounds.height) ? 500 : contentRect.bounds.height
      }
      itemCount={data.length}
      itemSize={() => {
        const h = 45

        if ('browser' in process && window.innerWidth <= 1500) {
          return h * 2
        }

        return h
      }}
      renderItem={({ index, style }) => (
        <Box
          as="a"
          key={data[index]._id}
          id={data[index]._id}
          href={data[index].url}
          target="_blank"
          style={style as React.HTMLAttributes<HTMLElement>['style']}
          onMouseEnter={e => e.currentTarget.classList.add('active-row')}
          onMouseLeave={e => e.currentTarget.classList.remove('active-row')}>
          {columns.map(c => {
            const C = Columns[c.key.slice(0, 1).toUpperCase() + c.key.slice(1)]
            return <C key={c.key} item={data[index]} />
          })}
        </Box>
      )}
    />
  </div>
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
