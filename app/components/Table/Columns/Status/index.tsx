import { isOld } from '@/lib/utils'
import { MockResult } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
import Status from './style'

export default compose<StatusProps, StatusProps>(setDisplayName('col-status'))(
  ({ item = {}, children }) => (
    <Status name="bids">
      {!('id' in item) ? (
        children
      ) : (
        <Box>
          {isOld(item.date, 32) ? (
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
  item?: MockResult
}
