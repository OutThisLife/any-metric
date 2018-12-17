import { dateFormat, djs, tickerFormat } from '@/lib/utils'
import { compose, setDisplayName } from 'recompose'

import { ColumnProps } from '../'
import { Text } from '../../style'
import Time from './style'

export default compose<ColumnProps, ColumnProps>(
  setDisplayName('col-datetime')
)(({ item }) => (
  <Time name="createdAt">
    {item.status !== 'Active' || djs(item.timeLeft).isBefore(djs()) ? (
      <Text as="div">{item.status}</Text>
    ) : (
      <Text as="div" className="hl">
        <time>{tickerFormat(item.timeLeft)}</time>
      </Text>
    )}

    <Text as="div">{dateFormat(item.createdAt)}</Text>
  </Time>
))
