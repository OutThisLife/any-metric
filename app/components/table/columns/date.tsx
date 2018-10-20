import { dateFormat, unixDateFormat } from '@/lib/utils'

import { Cell } from '.'
import { Date } from './style'

export default ({ cellData: date }: Cell<Date>) => (
  <Date title={unixDateFormat(date)}>{dateFormat(date)}</Date>
)
