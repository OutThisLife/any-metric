import { Product } from '@/server/schema/types'
import { BoxProps } from 'rebass'

export { default as Image } from './Image'
export { default as Price } from './Price'
export { default as Time } from './Time'
export { default as Title } from './Title'
export { default as User } from './User'

export interface ColumnProps extends BoxProps {
  as?: any
  ref?: any
  name?: string
  item?: Product
}
