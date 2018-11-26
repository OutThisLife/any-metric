import { BoxProps, ReactBox } from '@/components/Box'
import dynamic from 'next/dynamic'
import {
  branch,
  compose,
  defaultProps,
  renderComponent,
  setDisplayName
} from 'recompose'

import Table, { ITable } from '../style'

export const Cols = compose<ColumnProps, ColumnProps>(
  defaultProps<ColumnProps>({
    isHeader: false,
    flex: 2.5,
    textAlign: 'left'
  }),
  setDisplayName('cell'),
  branch<ColumnProps>(
    props => props.isHeader,
    renderComponent(Table.HeaderCell)
  )
)(Table.Cell) as ReactBox<ColumnProps> & IColumns

Cols.Base = Cols
Cols.Title = dynamic(import('./Title') as Promise<any>)
Cols.Check = dynamic(import('./Check') as Promise<any>)
Cols.Time = dynamic(import('./Time') as Promise<any>)
Cols.Status = dynamic(import('./Status') as Promise<any>)
Cols.Price = dynamic(import('./Price') as Promise<any>)

export type ColumnProps = { isHeader?: boolean } & BoxProps<
  HTMLTableCellElement
>

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
