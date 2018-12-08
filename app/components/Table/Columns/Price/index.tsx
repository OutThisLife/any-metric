import { numFormat } from '@/lib/utils'
import { MockResult } from '@/server/schema/types'
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
        <>
          <Text
            as="div"
            className={parseInt(item.price, 10) % 2 ? 'up' : 'down'}>
            {numFormat(parseFloat(item.price))}
          </Text>

          <Text as="div">S: {numFormat(parseFloat(item.shipping))}</Text>
        </>
      )}
    </Price>
  )
)

export interface PriceProps extends ColumnProps {
  item?: MockResult
}
