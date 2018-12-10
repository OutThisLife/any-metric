import { isOld } from '@/lib/utils'
import { Product } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
import Status from './style'

export default compose<StatusProps, StatusProps>(setDisplayName('col-status'))(
  ({ item = {}, children }) => (
    <Status name="bids">
      {!('_id' in item) ? (
        children
      ) : (
        <Box>
          {isOld(item.createdAt, 32) ? (
            <Text>Sold</Text>
          ) : (
            <Text className="hl">1d 9h</Text>
          )}
        </Box>
      )}
    </Status>
  )
)

export interface StatusProps extends ColumnProps {
  item?: Product
}
