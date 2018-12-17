import { moneyFormat, numFormat } from '@/lib/utils'
import { Product } from '@/server/schema/types'
import { compose, setDisplayName } from 'recompose'

import { ColumnProps } from '..'
import { Text } from '../../style'
import Price from './style'

export default compose<PriceProps, PriceProps>(setDisplayName('col-price'))(
  ({ item }) => (
    <Price name="price">
      <Text as="div" className="up">
        {moneyFormat(item.price)}
      </Text>

      <Text as="div">
        S: {item.shipping > 0 ? numFormat(item.shipping) : 'n/a'}
      </Text>
    </Price>
  )
)

export interface PriceProps extends ColumnProps {
  item?: Product
}
