import dynamic from 'next/dynamic'
import {
  branch,
  compose,
  defaultProps,
  renderComponent,
  setDisplayName
} from 'recompose'

import Table from '../style'

export const Cols = compose<Props, Props>(
  defaultProps({
    isHeader: false,
    flex: 2.5,
    textAlign: 'left'
  }),
  branch<Props>(props => props.isHeader, renderComponent(Table.HeaderCell)),
  setDisplayName('cell')
)(Table.Cell) as any

Cols.Cell = Cols
Cols.Title = dynamic(import('./Title'))
Cols.Check = dynamic(import('./Check'))
Cols.Time = dynamic(import('./Time'))
Cols.Price = dynamic(import('./Price'))

export interface Props extends React.CSSProperties {
  isHeader?: boolean
  [key: string]: any
}

export default Cols
