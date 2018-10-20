import { FakeCrawlResult } from '@/server/schema/types'
import { TableCellProps } from 'react-virtualized'

export { default as Title } from './title'
export { default as Link } from './link'
export { default as Image } from './img'
export { default as Date } from './date'

export interface Cell<K = T[keyof T], T = FakeCrawlResult>
  extends TableCellProps {
  cellData?: K
  rowData: T
}
