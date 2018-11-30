import { BoxProps, ReactBox } from '@/components/Box'
import { HomeState } from '@/pages/home'
import { Icon } from 'evergreen-ui'
import dynamic from 'next/dynamic'
import { bool, func, shape } from 'prop-types'
import {
  branch,
  compose,
  defaultProps,
  getContext,
  renderComponent,
  setDisplayName,
  shouldUpdate
} from 'recompose'

import Table, { ITable } from '../style'

export const Cols = compose<ColumnProps, ColumnProps>(
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
  setDisplayName('cell'),
  branch<ColumnProps>(props => !props.isHeader, renderComponent(Table.Cell)),
  shouldUpdate<ColumnProps>(props => props.isHeader)
)(({ children, name, sort, sortBy, ...props }) => (
  <Table.HeaderCell
    display="flex"
    alignItems="center"
    onClick={() => sortBy({ name, dir: sort.dir === 'asc' ? 'desc' : 'asc' })}
    {...props}>
    <span>{children}</span>

    {sort.name === name && (
      <Icon
        size={13}
        icon={`caret-${sort.dir === 'desc' ? 'down' : 'up'}`}
        marginLeft={2}
      />
    )}
  </Table.HeaderCell>
)) as ReactBox<ColumnProps> & IColumns

Cols.Base = Cols
Cols.Title = dynamic(import('./Title') as Promise<any>)
Cols.Check = dynamic(import('./Check') as Promise<any>)
Cols.Time = dynamic(import('./Time') as Promise<any>)
Cols.Status = dynamic(import('./Status') as Promise<any>)
Cols.Price = dynamic(import('./Price') as Promise<any>)

export interface ColumnProps extends BoxProps<HTMLTableCellElement> {
  sort?: HomeState['sort']
  name?: string
  isHeader?: boolean
}

export interface IColumns<T = ITable['Cell']> {
  Base?: T
  Title?: T
  Check?: T
  Time?: T
  Status?: T
  Price?: T
}

export { Table }
export default Cols
