import { FakeCrawlResult } from '@/server/schema/types'
import { TextDropdownButton } from 'evergreen-ui'
import {
  defaultTableRowRenderer,
  TableHeaderProps,
  TableHeaderRenderer,
  TableRowProps,
  TableRowRenderer
} from 'react-virtualized'
import {
  compose,
  mapProps,
  setDisplayName,
  shallowEqual,
  shouldUpdate
} from 'recompose'

export const headerRenderer: TableHeaderRenderer = (compose<
  TableHeaderProps,
  TableHeaderProps
>(setDisplayName('header-render')) as any)(
  ({ label, sortBy, sortDirection, dataKey, ...props }) => (
    <TextDropdownButton
      icon={
        sortBy === dataKey &&
        `chevron-${sortDirection === 'ASC' ? 'up' : 'down'}`
      }
      {...props}>
      {label}
    </TextDropdownButton>
  )
)

export const rowRenderer: TableRowRenderer = (compose<
  TableRowProps & { TableRow: React.ComponentClass<TableRowProps> },
  TableRowProps
>(
  setDisplayName('row-render'),
  mapProps(props => ({
    ...props,
    TableRow: defaultTableRowRenderer
  })),
  shouldUpdate<{ rowData: FakeCrawlResult }>(
    (p, np) => !shallowEqual(p.rowData, np.rowData)
  )
) as any)(({ TableRow, ...props }) => <TableRow {...props} />)
