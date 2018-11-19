import { sortByDate } from '@/lib/utils'
import { FakeCrawlResult } from '@/server/schema/types'
import { Icon } from 'evergreen-ui'
import { AutoSizer, Column, SortDirectionType } from 'react-virtualized'
import {
  compose,
  setDisplayName,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  withPropsOnChange,
  withStateHandlers
} from 'recompose'

import { DataTableFilter } from '../pod'
import * as Columns from './columns'
import { headerRenderer, rowRenderer } from './renders'
import Search from './search'
import DataTable from './style'

interface TOutter {
  initialData: FakeCrawlResult[]
}

interface TInner {
  filter: DataTableFilter
}

interface TState {
  data: FakeCrawlResult[]
  sort: SortProps
}

interface SortProps {
  sortBy: string
  sortDirection: SortDirectionType
}

interface TStateHandles extends StateHandlerMap<TState> {
  onSort: StateHandler<TState>
}

export default compose<TState & TStateHandles & TInner & TOutter, TOutter>(
  setDisplayName('table'),
  withStateHandlers<TState, TStateHandles, TOutter>(
    ({ initialData }) => {
      const data = [].slice.call(initialData).sort(sortByDate)
      return { data, sort: { sortBy: 'date', sortDirection: 'ASC' } }
    },
    {
      onSort: ({ sort: curSort, data: curData }) => (
        sort: SortProps = curSort,
        initialData: FakeCrawlResult[] = curData
      ) => {
        const { sortBy, sortDirection } = sort
        const data = [].slice.call(initialData)

        if (sortBy === 'date') {
          data.sort(sortByDate)
        } else {
          data.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
        }

        if (sortDirection === 'DESC') {
          data.reverse()
        }

        return { sort, data }
      }
    }
  ),
  withPropsOnChange<{}, TStateHandles & TOutter>(
    (props, nextProps) =>
      !shallowEqual(props.initialData, nextProps.initialData),
    ({ onSort, sort, initialData }) => onSort(sort, initialData)
  )
)(({ data, onSort, sort: { sortBy, sortDirection } }) => (
  <AutoSizer>
    {({ width, height }) => (
      <DataTable
        width={width}
        height={height}
        headerHeight={35}
        rowHeight={65}
        rowCount={data.length}
        rowGetter={({ index: i }) => data[i]}
        rowRenderer={rowRenderer}
        sort={onSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
        overscanRowCount={5}>
        <Column
          dataKey="image"
          width={30}
          headerRenderer={() => <Search />}
          disableSort
          cellRenderer={props => <Columns.Image {...props} />}
        />

        <Column
          dataKey="title"
          width={100}
          flexGrow={1}
          disableSort
          cellRenderer={props => <Columns.Title {...props} />}
        />

        <Column
          label="Date"
          dataKey="date"
          width={50}
          headerStyle={{ textAlign: 'center' }}
          style={{ textAlign: 'center' }}
          headerRenderer={headerRenderer}
          cellRenderer={Columns.Date}
        />

        <Column
          label={<Icon icon="link" size={10} />}
          dataKey="slug"
          width={26}
          style={{ margin: 0 }}
          disableSort
          headerStyle={{ textAlign: 'right' }}
          cellRenderer={Columns.Link}
        />
      </DataTable>
    )}
  </AutoSizer>
))
