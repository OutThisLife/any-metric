import dateFormat, { unixDateFormat } from '@/lib/dateUtils'
import styled from 'styled-components'

import { Cell } from '.'

export default ({ cellData: date }: Cell<Date>) => (
  <Date title={unixDateFormat(date)}>{dateFormat(date)}</Date>
)

const Date = styled.time`
  font-size: 0.9em;
  margin-left: auto;
`
