import { djs, tickerFormat } from '@/lib/utils'
import { Product } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
import Status from './style'

export default compose<StatusProps, StatusProps>(setDisplayName('col-status'))(
  ({ item = {}, children }) => (
    <Status name="timeLeft">
      {!('_id' in item) ? (
        children
      ) : (
        <Box>
          {item.status !== 'Active' || djs(item.timeLeft).isBefore(djs()) ? (
            <Text>{item.status}</Text>
          ) : (
            <Text className="hl">
              <time>{tickerFormat(item.timeLeft)}</time>
            </Text>
          )}
        </Box>
      )}
    </Status>
  )
)

export interface StatusProps extends ColumnProps {
  item?: Product
  onRef?: (r: HTMLElement) => void
}
