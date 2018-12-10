import Text from '@/components/Text'
import { Product } from '@/server/schema/types'
import { bool, func, object } from 'prop-types'
import { FaCaretDown, FaCaretUp, FaSort } from 'react-icons/fa'
import { BoxProps, Flex } from 'rebass'
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

    const isSorted = sortKey === name

    return (
      <HeaderCell
        aria-label={name}
        data-sorted={isSorted}
        onClick={() =>
          sortBy({
            name,
            dir: isSorted ? (dir === 'asc' ? 'desc' : 'asc') : 'desc'
          })
        }
        {...props}>
        <Flex alignItems="center" justifyContent="inherit">
          <span style={{ marginRight: 2 }}>
            <Text as="h5">{children}</Text>
          </span>

          {isSorted ? (
            <>{dir === 'desc' ? <FaCaretDown /> : <FaCaretUp />}</>
          ) : (
            <FaSort opacity={0.5} />
          )}
        </Flex>
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
  item?: Product
  sort?: {
    dir: string
    name: string
  }
  sortBy?: (a: ColumnProps['sort']) => void
}
