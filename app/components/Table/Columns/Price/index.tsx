import { moneyFormat, numFormat } from '@/lib/utils'
import { FakeResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
import Price from './style'

export default compose<PriceProps & BaphoTheme, PriceProps>(
  setDisplayName('col-price')
)(({ children, item = {} }) => (
  <Price name="price">
    {!('id' in item) ? (
      children
    ) : (
      <Box as="span">
        <Text
          className={parseInt(item.price, 10) % 2 ? 'up' : 'down'}
          fontWeight="500">
          {moneyFormat(parseFloat(item.price))}
        </Text>

        <Text fontWeight="300" mt={1}>
          {numFormat(parseFloat(item.shipping))}
        </Text>
      </Box>
    )}
  </Price>
))

export interface PriceProps extends ColumnProps {
  item?: FakeResult
}
