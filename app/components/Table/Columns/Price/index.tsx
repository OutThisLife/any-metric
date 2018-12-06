import { moneyFormat, numFormat } from '@/lib/utils'
import { MockResult } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
import Price from './style'

export default compose<PriceProps, PriceProps>(setDisplayName('col-price'))(
  ({ children, item = {} }) => (
    <Price name="price">
      {!('id' in item) ? (
        children
      ) : (
        <Box as="span">
          <Text
            fontWeight="700"
            className={parseInt(item.price, 10) % 2 ? 'up' : 'down'}>
            {moneyFormat(parseFloat(item.price))}
          </Text>

          <Text
            mt={1}
            fontWeight="300"
            css={`
              color: ${({ theme }) => theme.colours.muted};
              font-size: 0.9rem;
              line-height: 0;
            `}>
            {numFormat(parseFloat(item.shipping))}
          </Text>
        </Box>
      )}
    </Price>
  )
)

export interface PriceProps extends ColumnProps {
  item?: MockResult
}
