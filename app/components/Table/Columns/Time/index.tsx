import { dateFormat } from '@/lib/utils'
import { compose, setDisplayName } from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
import Time from './style'

export default compose<ColumnProps, ColumnProps>(
  setDisplayName('col-datetime')
)(({ children, item = {} }) => (
  <Time name="date">
    {!('id' in item) ? children : <Text as="div">{dateFormat(item.date)}</Text>}
  </Time>
))
