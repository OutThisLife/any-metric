import { dateFormat } from '@/lib/utils'
import { BaphoTheme } from '@/theme'
import { compose, defaultProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import { Text } from '../../style'
import Column, { ColumnProps } from '../Column'

export default compose<ColumnProps & BaphoTheme, ColumnProps>(
  setDisplayName('col-datetime'),
  defaultProps<ColumnProps>({
    name: 'date'
  }),
  withTheme
)(({ theme, children, item = {}, ...props }) => (
  <Column {...props}>
    {!('id' in item) ? (
      children
    ) : (
      <Text
        css={`
          color: ${theme.colours.muted};
          font-weight: 300;
          font-size: 0.9rem;
        `}>
        {dateFormat(item.date)}
      </Text>
    )}
  </Column>
))
