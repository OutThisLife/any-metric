import { BoxProps, ReactBox } from '@/components/Box'
import { Icon } from 'evergreen-ui'
import dynamic from 'next/dynamic'
import { array, bool, func, shape } from 'prop-types'
import {
  branch,
  compose,
  defaultProps,
  getContext,
  renderComponent,
  setDisplayName
} from 'recompose'

import { TableOutterProps } from '..'
import Table, { ITable } from '../Elements'

export const Cols = compose<ColumnProps, ColumnProps>(
  setDisplayName('cell'),
  defaultProps<ColumnProps>({
    name: Math.random().toString(),
    flex: 2.5,
    textAlign: 'left'
  }),
  getContext({
    isHeader: bool,
    sort: shape({}),
    sortBy: func
  }),
  branch<ColumnProps>(
    props => !props.isHeader || props.disableSort,
    renderComponent(Table.Cell)
  )
)(({ children, name, sort: { dir, name: sortKey }, sortBy, ...props }) => (
  <Table.HeaderCell
    display="flex"
    alignItems="center"
    onClick={() => sortBy({ name, dir: dir === 'asc' ? 'desc' : 'asc' })}
    {...props}>
    <span>{children}</span>

    {sortKey === name && (
      <Icon
        size={13}
        icon={`caret-${dir === 'desc' ? 'down' : 'up'}`}
        marginLeft={2}
      />
    )}
  </Table.HeaderCell>
)) as ReactBox<ColumnProps> & IColumns

Cols.Title = dynamic(import('./Title') as Promise<any>)
Cols.Check = dynamic(import('./Check') as Promise<any>)
Cols.Time = dynamic(import('./Time') as Promise<any>)
Cols.Status = dynamic(import('./Status') as Promise<any>)
Cols.Price = dynamic(import('./Price') as Promise<any>)

export const RenderColumns = compose<RenderColumnProps, RenderColumnProps>(
  getContext({ columns: array }),
  setDisplayName('render-columns')
)(({ props, columns = [] }) => (
  <>
    {columns.map(c => {
      const C = Cols[c.key.slice(0, 1).toUpperCase() + c.key.slice(1)] || Cols
      return <C key={c.key} {...props(c)} />
    })}
  </>
))

export interface ColumnProps extends BoxProps<HTMLTableCellElement> {
  sort?: {
    dir: string
    name: string
  }
  name?: string
  disableSort?: boolean
  isHeader?: boolean
}

export interface IColumns<T = ITable['Cell']> {
  Title?: T
  Check?: T
  Time?: T
  Status?: T
  Price?: T
}

export interface RenderColumnProps {
  columns?: TableOutterProps['columns']
  props: (c: any) => { [key: string]: any }
}

export { Table }
export default Cols
