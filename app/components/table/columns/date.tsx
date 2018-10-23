import { dateFormat, unixDateFormat } from '@/lib/utils'
import { Text } from 'evergreen-ui'

import { Cell } from '.'

export default ({ cellData: date }: Cell<Date>) => (
  <Text size={300} title={unixDateFormat(date)}>
    {dateFormat(date)}
  </Text>
)
