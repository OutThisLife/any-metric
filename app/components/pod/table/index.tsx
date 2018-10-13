import { FakeCrawlResult } from '@/server/schema/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  IoIosLink,
  IoLogoReddit,
  IoLogoTwitter,
  IoMdImage,
  IoMdOpen
} from 'react-icons/io'
import { AutoSizer, Column, SortDirectionType, Table } from 'react-virtualized'
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

dayjs.extend(relativeTime)

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

interface Cell {
  cellData?: keyof FakeCrawlResult
  rowData?: FakeCrawlResult
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
          overscanRowCount={5}>
          <Column
            label={<IoIosLink />}
            dataKey="slug"
            width={26}
            style={{ margin: 0 }}
            disableSort={true}
            cellRenderer={() => (
              <div className="datasrc">
                {Math.random() > 0.5 ? <IoLogoTwitter /> : <IoLogoReddit />}
                <IoMdOpen />
              </div>
            )}
          />

          <Column
            label={<IoMdImage />}
            dataKey="image"
            width={30}
            disableSort={true}
            cellRenderer={({ cellData, rowData: { title } }: Cell) => (
              <figure>
                <img src={cellData} alt={title} />
              </figure>
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
            label="Date"
            dataKey="date"
            width={80}
            headerStyle={{ textAlign: 'right' }}
            style={{ textAlign: 'right' }}
            cellRenderer={({ cellData: date }) => {
              const d = dayjs(date)

              return (
                <time title={d.valueOf().toString()}>
                  {d.day() === dayjs().day() ? d.format('h:mm a') : d.from()}
                </time>
              )
            }}
          />
        </Table>
      )}
    </AutoSizer>
  </DataTable>
))

const sortByDate = (a: FakeCrawlResult, b: FakeCrawlResult) =>
  dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
