import { djs, tickerFormat } from '@/lib/utils'
import { Product } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers } from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
import Status from './style'

export default compose<StatusProps, StatusProps>(
  setDisplayName('col-status'),
  withHandlers(() => {
    let tm

    return {
      onRef: ({ item }) => ref => {
        if (!ref) {
          return
        }

        ref.innerText = tickerFormat(item.timeLeft)

        if (djs(item.timeLeft).diff(djs(), 'hour') <= 12) {
          clearInterval(tm)

          tm = setInterval(
            () => (ref.innerText = tickerFormat(item.timeLeft)),
            1e3
          )
        }
      }
    }
  })
)(({ onRef, item = {}, children }) => (
  <Status name="timeLeft">
    {!('_id' in item) ? (
      children
    ) : (
      <Box>
        {item.status !== 'Active' || djs(item.timeLeft).isBefore(djs()) ? (
          <Text>{item.status}</Text>
        ) : (
          <Text className="hl">
            <time ref={onRef}>{tickerFormat(item.timeLeft)}</time>
          </Text>
        )}
      </Box>
    )}
  </Status>
))

export interface StatusProps extends ColumnProps {
  item?: Product
  onRef?: (r: HTMLElement) => void
}
