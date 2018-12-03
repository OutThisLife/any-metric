import { array } from 'prop-types'
import { compose, getContext, setDisplayName } from 'recompose'

import { Base } from '../Columns'
import { Text } from '../style'

export default compose<
  PaginationProps & { columns: string[] },
  PaginationProps
>(
  setDisplayName('render-columns'),
  getContext({ columns: array })
)(({ columns = [], total }) => (
  <Base colSpan={columns.length + 1}>
    <Text as="div" textAlign="center" fontWeight="300" fontSize={10}>
      Found {total} results
    </Text>
  </Base>
))

export interface PaginationProps {
  total: number
}
