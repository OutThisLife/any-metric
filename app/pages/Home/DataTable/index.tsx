import Table from '@/components/Table'
import { FakeResult } from '@/server/schema/types'
import { compose, setDisplayName } from 'recompose'

export default compose<DataTableProps, DataTableProps>(
  setDisplayName('datatable')
)(({ data = [] }) => (
  <Table
    data={data}
    columns={[
      {
        label: 'Product',
        key: 'title'
      },
      {
        label: 'Date',
        key: 'time'
      },
      {
        label: 'Status',
        key: 'status'
      },
      {
        label: 'Price',
        key: 'price'
      }
    ]}
  />
))

export interface DataTableProps {
  data?: FakeResult[]
}
