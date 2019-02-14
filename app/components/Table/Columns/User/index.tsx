import { Product } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { ColumnProps } from '..'

export default compose<UserProps, UserProps>(setDisplayName('col-user'))(
  ({ item }) => <Box name="user">{item.username}</Box>
)

export interface UserProps extends ColumnProps {
  item?: Product
}
