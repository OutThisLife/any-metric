import { dateFormat, unixDateFormat } from '@/lib/utils'
import { Text } from 'evergreen-ui'
import { compose, setDisplayName } from 'recompose'

import { Cell } from '.'

export default (compose<Cell<Date>, Cell<Date>>(setDisplayName('date')) as any)(
  ({ cellData: date }) => (
    <Text size={300} title={unixDateFormat(date)}>
      {dateFormat(date)}
    </Text>
  )
)
