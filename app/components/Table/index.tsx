import { moneyFormat } from '@/lib/utils'
import { Product, Tag } from '@/server/schema/types'
import { GridApi, GridReadyEvent } from 'ag-grid-community'
import {
  IFloatingFilterParams
} from 'ag-grid-community/dist/lib/filter/floatingFilter'
import { AgGridReact } from 'ag-grid-react'
import Measure from 'react-measure'
import {
  branch,
  compose,
  renderComponent,
  setDisplayName,
  withHandlers,
  withState
} from 'recompose'

import DropdownFilter from './DropdownFilter'
import RangeFilter from './RangeFilter'
import SearchFilter from './SearchFilter'
import Table from './style'

export default compose<TableProps & TableHandles, TableProps>(
  setDisplayName('table'),
  branch(({ data = [] }) => !data.length, renderComponent(() => null)),
  withState('api', 'bindApi', {}),
  withHandlers<TableProps, TableHandles>(() => ({
    handleGridReady: ({ bindApi }) => g =>
      bindApi(g.api, () => g.api.sizeColumnsToFit()),
    handleResize: ({ api }) => () => {
      if ('sizeColumnsToFit' in api) {
        window.requestAnimationFrame(() => api.sizeColumnsToFit())
      }
    }
  }))
)(({ handleResize, handleGridReady, data = [], tags = [] }) => (
  <Measure client onResize={handleResize}>
    {({ measureRef }) => (
      <Table
        ref={measureRef}
        className="ag-theme-balham"
        style={{ width: 'calc(100vw - 50px)', height: 'calc(66vh - 25px)' }}>
        <AgGridReact
          defaultColDef={{
            editable: false,
            sortable: true,
            resizable: true
          }}
          columnDefs={[
            {
              headerName: 'Price',
              field: 'price',
              floatingFilterComponent: 'RangeFilter',
              floatingFilterComponentParams: {
                maxValue: Math.max(...data.map(d => d.price), 0),
                suppressFilterButton: true
              },
              filter: 'agNumberColumnFilter',
              maxWidth: 100,
              valueFormatter: d => moneyFormat(d.data.price)
            },
            {
              headerName: '',
              field: 'image',
              minWidth: 60,
              maxWidth: 60,
              cellRenderer: ({ value }) => `
                <figure class="im">
                  <img src=${value.replace(/https?:/, '')} width="80" alt="" />
                </figure>
              `
            },
            {
              headerName: 'Name',
              field: 'title',
              floatingFilterComponent: 'SearchFilter',
              floatingFilterComponentParams: {
                label: 'Search by name',
                suppressFilterButton: true
              },
              filter: 'agTextColumnFilter',
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
                tags,
                suppressFilterButton: true
              },
              filter: 'agTextColumnFilter',
              filterParams: {
                debounceMs: 2000,
                textFormatter: d => d,
                textCustomComparator: (_, [d], v) =>
                  v.length ? d.slug === v : true
              },
              valueFormatter: d => d.data.tags.map(t => t.title).join(',')
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
          ]}
          onCellMouseOver={d =>
            'image' in d.data &&
            document.getElementById('z-im').setAttribute('src', d.data.image)
          }
          onCellMouseOut={() =>
            document.getElementById('z-im').removeAttribute('src')
          }
          frameworkComponents={{ SearchFilter, DropdownFilter, RangeFilter }}
          onGridReady={handleGridReady}
          rowData={data}
          debug={true}
          enableRangeSelection={true}
          paginationAutoPageSize={true}
          pagination={true}
          animateRows={false}
          rowHeight={60}
          floatingFilter={true}
          suppressColumnMoveAnimation={true}
        />

        <img id="z-im" />
      </Table>
    )}
  </Measure>
))

export interface TableProps {
  data: Product[]
  tags?: Tag[]
  api?: GridApi
  bindApi?: (a: TableProps['api'], b?: () => any) => void
}

export interface TableHandles {
  handleGridReady: (a: GridReadyEvent) => void
  handleResize: () => void
}

export interface FloatingFilterProps extends IFloatingFilterParams<{}, {}> {
  label?: string
  tags?: Tag[]
}
