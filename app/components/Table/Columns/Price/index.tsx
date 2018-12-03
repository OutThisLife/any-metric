import { moneyFormat, numFormat } from '@/lib/utils'
import { FakeResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import { Box } from 'rebass'
import { compose, defaultProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import { Text } from '../../style'
import Column, { ColumnProps } from '../Column'

export default compose<PriceProps & BaphoTheme, PriceProps>(
  setDisplayName('col-price'),
  defaultProps<PriceProps>({
    name: 'price'
  }),
  withTheme
)(({ theme, children, item = {} }) => (
  <Column
    css={`
      line-height: 0;
      text-align: right;
      padding-right: var(--pad);
    `}>
    {!('id' in item) ? (
      children
    ) : (
      <Box
        css={`
          font-size: 0.8rem;
          line-height: 1.2;

          > span {
            display: block;
            width: 100%;
          }
        `}>
        <Text
          fontWeight="500"
          color={
            parseInt(item.price, 10) % 3
              ? theme.colours.price.up
              : theme.colours.price.down
          }>
          {moneyFormat(parseFloat(item.price))}
        </Text>

        <Text fontWeight="300" color={theme.colours.muted} mt={1}>
          {numFormat(parseFloat(item.shipping))}
        </Text>
      </Box>
    )}
  </Column>
))

export interface PriceProps extends ColumnProps {
  item?: FakeResult
}
