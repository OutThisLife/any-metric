import { BoxProps, ReactBox } from '@/components/Box'
import BaseText from '@/components/Text'
import { BaphoTheme } from '@/theme'
import { Table as BaseTable } from 'evergreen-ui'
import omit from 'lodash/omit'
import { bool } from 'prop-types'
import { compose, defaultProps, mapProps, withContext } from 'recompose'
import { withTheme } from 'styled-components'

import Table from '../style'

const enhance = <T extends {}>(...funcs: any[]) =>
  compose<ITable & T, ITable>(
    defaultProps({
      marginX: 0,
      marginY: 0,
      paddingX: 0,
      paddingY: 0,
      borderBottom: '0px'
    }),
    mapProps(props =>
      omit(props, [
        'theme',
        'sort',
        'sortBy',
        'name',
        'disableSort',
        'isHeader'
      ])
    ),
    ...funcs
  )

Table.Head = enhance(
  defaultProps({ className: 'head', background: 'none' }),
  withContext({ isHeader: bool }, () => ({ isHeader: true }))
)(BaseTable.Head)

Table.Body = enhance(defaultProps({ allowAutoHeight: true }))(
  BaseTable.VirtualBody
)

Table.Row = enhance(
  defaultProps({
    className: 'row',
    height: 'auto'
  })
)(BaseTable.Row)

Table.Cell = enhance(
  defaultProps({
    className: 'cell'
  })
)(BaseTable.Cell)

Table.Text = enhance<BoxProps<HTMLParagraphElement>>(
  defaultProps({
    width: '100%',
    fontWeight: 300,
    fontSize: '0.9rem',
    textAlign: 'inherit'
  })
)(BaseText)

Table.HeaderCell = enhance<BaphoTheme>(withTheme)(
  ({ theme, children, ...props }) => (
    <BaseTable.HeaderCell {...props}>
      <Table.Text color={theme.colours.label}>{children}</Table.Text>
    </BaseTable.HeaderCell>
  )
)

export interface ITable<P = {}> {
  Head?: ReactBox<P, HTMLTableElement>
  HeaderCell?: ReactBox<P, HTMLTableHeaderCellElement>
  Body?: ReactBox<P, HTMLTableElement>
  Row?: ReactBox<P, HTMLTableRowElement>
  Cell?: ReactBox<P, HTMLTableCellElement>
  Text?: ReactBox<P, HTMLTableCellElement>
}

export default Table
