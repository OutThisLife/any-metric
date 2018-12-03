import { dateFormat } from '@/lib/utils'
import { BaphoTheme } from '@/theme'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import { Text } from '../../style'
import Column, { ColumnProps } from '../Column'

export default compose<ColumnProps & BaphoTheme, ColumnProps>(
  setDisplayName('col-datetime'),
  withTheme
)(({ theme, children, item = {} }) => (
  <Column
    name="date"
    width={75}
    css={`
      text-align: right;
    `}>
    {!('id' in item) ? (
      children
    ) : (
      <Text
        as="div"
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
