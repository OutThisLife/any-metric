import { BoxProps } from '@/components/Box'
import Text from '@/components/Text'
import { BaphoTheme } from '@/theme'
import { Table as BaseTable } from 'evergreen-ui'
import omit from 'lodash/omit'
import { compose, defaultProps, mapProps } from 'recompose'
import { withTheme } from 'styled-components'

import Table, { ITable } from './style'

const enhance = <T extends {}>(...funcs: any[]) =>
  compose<ITable & T, ITable>(
    defaultProps({
      marginX: 0,
      marginY: 0,
      paddingX: 0,
      paddingY: 0,
      borderBottom: '0px'
    }),
    mapProps(props => omit(props, ['isHeader', 'theme'])),
    ...funcs
  )

Table.Head = enhance(
  defaultProps({
    background: 'none'
  })
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
)(Text)

Table.HeaderCell = enhance<BaphoTheme>(withTheme)(
  ({ theme, children, ...props }) => (
    <BaseTable.HeaderCell {...props}>
      <Table.Text color={theme.colours.label}>{children}</Table.Text>
    </BaseTable.HeaderCell>
  )
)

export default Table
