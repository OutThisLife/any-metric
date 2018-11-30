import { dateFormat } from '@/lib/utils'
import { BaphoTheme } from '@/theme'
import { compose, defaultProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import { ColumnProps, Table } from '..'
import Time from './style'

export default compose<ColumnProps & BaphoTheme, ColumnProps>(
  withTheme,
  defaultProps<ColumnProps>({
    name: 'date',
    flex: 'unset',
    flexBasis: 100,
    textAlign: 'center'
  }),
  setDisplayName('col-datetime')
)(({ theme, children, item = {}, ...props }) => (
  <Time {...props}>
    {!('id' in item) ? (
      children
    ) : (
      <Table.Text color={theme.colours.muted}>
        {dateFormat(item.date)}
      </Table.Text>
    )}
  </Time>
))
