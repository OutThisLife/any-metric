import { moneyFormat, numFormat } from '@/lib/utils'
import { Product } from '@/server/schema/types'
import { compose, setDisplayName } from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
import Price from './style'

export default compose<PriceProps, PriceProps>(setDisplayName('col-price'))(
  ({ children, item = {} }) => (
    <Price name="price">
      {!('_id' in item) ? (
        children
      ) : (
        <>
          <Text as="div" className="up">
            {moneyFormat(item.price)}
          </Text>

          <Text as="div">
            S: {item.shipping > 0 ? numFormat(item.shipping) : 'n/a'}
          </Text>
        </>
      )}
    </Price>
  )
)

export interface PriceProps extends ColumnProps {
  item?: Product
}
