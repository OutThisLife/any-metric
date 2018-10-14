import dateFormat from '@/lib/dateFormat'
import { FakeCrawlResult } from '@/server/schema/types'
import dayjs from 'dayjs'
import {
  IoIosLink,
  IoLogoReddit,
  IoLogoTwitter,
  IoMdCalendar,
  IoMdImage,
  IoMdOpen
} from 'react-icons/io'
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

import DataTable from './style'

interface TOutter {
  initialData: FakeCrawlResult[]
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

interface Cell<T = FakeCrawlResult> {
  cellData?: T[keyof T]
  rowData?: T
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
)(({ onSort, sort: { sortBy, sortDirection }, data = [] }) => (
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
              rowGetter={({ index }) => data[index]}
              sort={onSort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSectionRendered={onSectionRendered}
              scrollToColumn={scrollToColumn}
              scrollToRow={scrollToRow}
              overscanRowCount={5}>
              <Column
                label={<IoMdImage />}
                dataKey="image"
                width={30}
                disableSort={true}
                cellRenderer={({ cellData: img, rowData: { title } }: Cell) => (
                  <figure>
                    <img src={img} alt={title} />
                  </figure>
                )}
              />

              <Column
                label={<IoMdCalendar />}
                dataKey="date"
                width={80}
                headerStyle={{ textAlign: 'center' }}
                style={{ textAlign: 'center' }}
                cellRenderer={({ cellData: date }: Cell) => (
                  <time title={dayjs(date).format()}>{dateFormat(date)}</time>
                )}
              />

              <Column
                label="Content"
                dataKey="title"
                width={100}
                flexGrow={1}
                cellRenderer={({
                  cellData: title,
                  rowData: { copy, tags }
                }: Cell) => (
                  <div>
                    <strong>{title}</strong>

                    <div className="copy">
                      <span>{copy}</span>
                      <span>
                        {tags.filter(t => t).map(t => (
                          <label key={`label-${t}`}>{t}</label>
                        ))}
                      </span>
                    </div>
                  </div>
                )}
              />

              <Column
                label={<IoIosLink />}
                dataKey="slug"
                width={26}
                style={{ margin: 0 }}
                disableSort={true}
                headerStyle={{ textAlign: 'right' }}
                cellRenderer={() => (
                  <div className="datasrc">
                    {Math.random() > 0.5 ? <IoLogoTwitter /> : <IoLogoReddit />}
                    <IoMdOpen />
                  </div>
                )}
              />
            </Table>
          )}
        </AutoSizer>
      )}
    </ArrowKeyStepper>
  </DataTable>
))

const sortByDate = (a: FakeCrawlResult, b: FakeCrawlResult) =>
  dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
