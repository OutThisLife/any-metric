import Text from '@/components/Text'
import { FakeResult } from '@/server/schema/types'
import { bool, func, object } from 'prop-types'
import { FaCaretDown, FaCaretUp, FaSort } from 'react-icons/fa'
import { BoxProps } from 'rebass'
import { compose, defaultProps, getContext, setDisplayName } from 'recompose'

import { Cell, HeaderCell } from '../style'

export default compose<
  ColumnProps,
  ColumnProps & React.AllHTMLAttributes<HTMLTableCellElement>
>(
  setDisplayName('column'),
  defaultProps<ColumnProps>({
    name: Math.random().toString(),
    disableSort: false
  }),
  getContext({
    isHeader: bool,
    sort: object,
    sortBy: func
  })
)(
  ({
    children,
    isHeader,
    disableSort,
    name,
    sort: { dir, name: sortKey },
    sortBy,
    ...props
  }) => {
    if (!isHeader) {
      return <Cell {...props}>{children}</Cell>
    } else if (disableSort) {
      return <HeaderCell {...props}>{children}</HeaderCell>
    }

    return (
      <HeaderCell
        onClick={() =>
          sortBy({
            name,
            dir: sortKey === name ? (dir === 'asc' ? 'desc' : 'asc') : 'desc'
          })
        }
        {...props}>
        <span style={{ marginRight: 2 }}>
          <Text as="h5">{children}</Text>
        </span>

        {sortKey === name ? (
          <>{dir === 'desc' ? <FaCaretDown /> : <FaCaretUp />}</>
        ) : (
          <FaSort opacity={0.5} />
        )}
      </HeaderCell>
    )
  }
)

export interface ColumnProps extends BoxProps {
  as?: any
  ref?: any
  isHeader?: boolean
  disableSort?: boolean
  name?: string
  item?: FakeResult
  sort?: {
    dir: string
    name: string
  }
  sortBy?: (a: ColumnProps['sort']) => void
}
