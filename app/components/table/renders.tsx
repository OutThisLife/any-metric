import { FakeCrawlResult } from '@/server/schema/types'
import { TextDropdownButton } from 'evergreen-ui'
import {
  defaultTableRowRenderer,
  TableHeaderProps,
  TableRowProps,
  TableRowRenderer
} from 'react-virtualized'
import { compose, mapProps, shallowEqual, shouldUpdate } from 'recompose'

export const headerRenderer = ({
  label,
  sortBy,
  sortDirection,
  dataKey,
  ...props
}: TableHeaderProps) => (
  <TextDropdownButton
    icon={
      sortBy === dataKey && `chevron-${sortDirection === 'ASC' ? 'up' : 'down'}`
    }
    {...props}>
    {label}
  </TextDropdownButton>
)

export const rowRenderer: TableRowRenderer = (compose<
  TableRowProps & { TableRow: React.ComponentClass<TableRowProps> },
  TableRowProps
>(
  mapProps(props => ({
    ...props,
    TableRow: defaultTableRowRenderer
  })),
  shouldUpdate<{ rowData: FakeCrawlResult }>(
    (p, np) => !shallowEqual(p.rowData, np.rowData)
  )
) as any)(({ TableRow, ...props }) => (
  <TableRow key={props.rowData.id} {...props} />
))
