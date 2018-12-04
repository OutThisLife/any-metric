import { isOld, pointFormat } from '@/lib/utils'
import { FakeResult } from '@/server/schema/types'
import { Flex } from 'rebass'
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
        <Flex>
          {isOld(item.date, 32) ? (
            <Text>Sold</Text>
          ) : (
            <>
              <Text className="hl">{pointFormat(parseInt(item.bids, 10))}</Text>

              <Text mt={-1}>bids</Text>
            </>
          )}
        </Flex>
      )}
    </Status>
  )
)

export interface StatusProps extends ColumnProps {
  item?: FakeResult
}
