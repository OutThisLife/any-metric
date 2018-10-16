import { sortByDate } from '@/lib/utils'
import { FakeCrawlResult } from '@/server/schema/types'
import { MdDateRange, MdLink, MdPhoto } from 'react-icons/md'
import {
  ArrowKeyStepper,
  AutoSizer,
  Column,
  SortDirectionType,
  Table
} from 'react-virtualized'
import {
  compose,
  setDisplayName,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  withPropsOnChange,
  withStateHandlers
} from 'recompose'

import * as Columns from './columns'
import DataTable from './style'

interface TOutter {
  initialData: FakeCrawlResult[]
  filterData: (t: string) => void
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

export default compose<TState & TStateHandles, TOutter>(
  setDisplayName('pod'),
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
)(({ filterData, onSort, sort: { sortBy, sortDirection }, data = [] }) => (
  <DataTable>
    <ArrowKeyStepper columnCount={4} rowCount={data.length}>
      {({ onSectionRendered, scrollToColumn, scrollToRow }) => (
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={width}
              height={height}
              headerHeight={35}
              rowHeight={50}
              rowCount={data.length}
              rowGetter={({ index: i }) => data[i]}
              sort={onSort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSectionRendered={onSectionRendered}
              scrollToColumn={scrollToColumn}
              scrollToRow={scrollToRow}
              overscanRowCount={5}>
              <Column
                label={<MdPhoto />}
                dataKey="image"
                width={30}
                disableSort={true}
                cellRenderer={Columns.Image}
              />

              <Column
                label={<MdDateRange />}
                dataKey="date"
                width={80}
                headerStyle={{ textAlign: 'center' }}
                style={{ textAlign: 'center' }}
                cellRenderer={Columns.Date}
              />

              <Column
                label="Content"
                dataKey="title"
                width={100}
                flexGrow={1}
                cellRenderer={props => (
                  <Columns.Title {...props} filterData={filterData} />
                )}
              />

              <Column
                label={<MdLink />}
                dataKey="slug"
                width={26}
                style={{ margin: 0 }}
                disableSort={true}
                headerStyle={{ textAlign: 'right' }}
                cellRenderer={Columns.Link}
              />
            </Table>
          )}
        </AutoSizer>
      )}
    </ArrowKeyStepper>
  </DataTable>
))
