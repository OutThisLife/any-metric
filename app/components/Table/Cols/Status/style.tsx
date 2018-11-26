import { BaphoTheme } from '@/theme'
import { compose, defaultProps, setDisplayName, withProps } from 'recompose'
import styled, { withTheme } from 'styled-components'

import { Cols, ColumnProps, Table } from '..'

export default styled<any>(Cols)``

export const StatusText = compose<ColumnProps, ColumnProps>(
  defaultProps<ColumnProps>({
    width: '100%',
    lineHeight: 1
  }),
  withTheme,
  withProps<ColumnProps, ColumnProps & BaphoTheme>(
    ({ theme, color = theme.colours.label }) => ({ color })
  ),
  setDisplayName('col-status-text')
)(Table.Text)
