import { moneyFormat } from '@/lib/utils'
import { Product } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { ColumnProps } from '..'

export default compose<PriceProps, PriceProps>(setDisplayName('col-price'))(
  ({ item }) => (
    <Box
      name="price"
      className="up"
      css={`
        font-weight: 700;
      `}>
      {moneyFormat(item.price)}
    </Box>
  )
)

export interface PriceProps extends ColumnProps {
  item?: Product
}
