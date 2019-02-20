import { moneyFormat } from '@/lib/utils'
import { HomeState } from '@/pages/Dashboard'
import { Tag } from '@/server/schema/types'
import { GridApi, GridOptions, IDatasource } from 'ag-grid-community'
import {
  IFloatingFilterParams
} from 'ag-grid-community/dist/lib/filter/floatingFilter'
import { AgGridReact } from 'ag-grid-react'
import { ObjectID } from 'bson'
import Measure from 'react-measure'
import {
  compose,
  setDisplayName,
  withHandlers,
  withProps,
  withState
} from 'recompose'

import DropdownFilter from './DropdownFilter'
import RangeFilter from './RangeFilter'
import SearchFilter from './SearchFilter'
import Table from './style'

const entriesPerPage = 100

export default compose<TableProps & TableHandles, TableProps>(
  setDisplayName('table'),
  withState('api', 'bindApi', {}),
  withHandlers<TableProps, TableHandles>(() => ({
    bindData: ({ api, total, fetchMore }) => () => ({
      rowCount: null,
      getRows: args =>
        fetchMore(
          {
            pageNumber: args.startRow,
            entriesPerPage: args.endRow
          },
          Object.entries(args.filterModel).reduce((acc, [k, v]) => {
            const obj = v as any

            switch (k) {
              case 'price':
                acc[k] = {
                  $gte: parseFloat(obj.filter)
                }
                break

              case 'tags':
                acc[k] = {
                  $in: [new ObjectID(obj.filter)]
                }
                break

              case 'createdAt':
                acc[k] = {
                  $gte: new Date(obj.dateFrom)
                }
                break
            }

            return acc
          }, {})
        )
          .then(({ data: { products = [] } }: any) => {
            args.successCallback(products, total)
            window.requestAnimationFrame(() => api.sizeColumnsToFit())
          })
          .catch(console.error)
    }),

    handleResize: ({ api }) => () =>
      'sizeColumnsToFit' in api &&
      window.requestAnimationFrame(() => api.sizeColumnsToFit())
  })),
  withProps<{ config: Partial<GridOptions> }, TableProps & TableHandles>(
    ({ bindData, bindApi, tags }) => ({
      config: {
        onGridReady: ({ api }) =>
          bindApi(api, () => api.setDatasource(bindData())),
        defaultColDef: {
          editable: false,
          resizable: true,
          sortable: true
        },
        columnDefs: [
          {
            headerName: 'Price',
            field: 'price',
            floatingFilterComponent: 'RangeFilter',
            floatingFilterComponentParams: {
              maxValue: 100000,
              suppressFilterButton: true
            },
            filter: 'agNumberColumnFilter',
            maxWidth: 100,
            valueFormatter: d => {
              try {
                return moneyFormat(d.data.price)
              } catch (err) {
                return ''
              }
            }
          },
          {
            headerName: '',
            field: 'image',
            minWidth: 60,
            maxWidth: 60,
            cellRenderer: ({ value }) => `
              <figure class="im">
                <img src=${value} width="80" alt="" />
              </figure>
            `
          },
          {
            headerName: 'Name',
            field: 'title',
            suppressMenu: false,
            sortable: false,
            width: 600,
            onCellClicked: d => window.open(d.data.url, '_blank')
          },
          {
            headerName: 'Query',
            field: 'tags',
            width: 50,
            floatingFilterComponent: 'DropdownFilter',
            floatingFilterComponentParams: {
              label: 'Filter by query',
              suppressFilterButton: true,
              tags
            },
            filter: 'agTextColumnFilter',
            filterParams: {
              debounceMs: 2000,
              textFormatter: d => d,
              textCustomComparator: (_, [d], v) =>
                v.length ? d._id === v : true
            },
            valueFormatter: d => {
              try {
                return d.data.tags.map(t => t.title).join(',')
              } catch {
                return ''
              }
            }
          },
          {
            headerName: 'Date',
            field: 'createdAt',
            width: 100,
            filter: 'agDateColumnFilter',
            floatingFilterComponentParams: {
              suppressFilterButton: true
            }
          }
        ],
        animateRows: false,
        cacheBlockSize: entriesPerPage,
        cacheOverflowSize: 2,
        debug: true,
        enableRangeSelection: true,
        floatingFilter: true,
        frameworkComponents: { SearchFilter, DropdownFilter, RangeFilter },
        infiniteInitialRowCount: 1,
        maxConcurrentDatasourceRequests: 2,
        paginationPageSize: entriesPerPage,
        rowHeight: 60,
        rowModelType: 'infinite',
        suppressColumnMoveAnimation: true
      }
    })
  )
)(({ handleResize, config = {} }) => (
  <Measure client onResize={handleResize}>
    {({ measureRef }) => (
      <Table
        ref={measureRef}
        className="ag-theme-balham"
        style={{ width: 'calc(100vw - 50px)', height: 'calc(66vh - 25px)' }}>
        <AgGridReact {...config} />
      </Table>
    )}
  </Measure>
))

export interface TableProps {
  fetchMore: HomeState['fetchMore']
  total: number
  tags: Tag[]
  config?: GridOptions
  api?: GridApi
  bindApi?: (a: TableProps['api'], b?: () => any) => void
}

export interface TableHandles {
  handleResize: () => void
  bindData: () => IDatasource
}

export interface FloatingFilterProps extends IFloatingFilterParams<{}, {}> {
  label?: string
  tags?: Tag[]
}
