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
    pr={0}
    css={`
      line-height: 0;
      text-align: right;
    `}>
    {!('id' in item) ? (
      children
    ) : (
      <Box
        css={`
          font-size: 0.9rem;
          line-height: 1.2;

          > span {
            display: block;
            width: 100%;
          }
        `}>
        <Text
          fontWeight="700"
          color={
            parseInt(item.price, 10) % 3
              ? theme.colours.price.up
              : theme.colours.price.down
          }>
          {moneyFormat(parseFloat(item.price))}
        </Text>

        <Text
          fontWeight="300"
          mt={1}
          css={`
            font-size: 0.9em;
          `}>
          {numFormat(parseFloat(item.shipping))}
        </Text>
      </Box>
    )}
  </Column>
))

export interface PriceProps extends ColumnProps {
  item?: FakeResult
}
