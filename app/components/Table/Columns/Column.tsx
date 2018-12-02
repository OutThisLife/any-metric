import { FakeResult } from '@/server/schema/types'
import { bool, func, shape } from 'prop-types'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { BoxProps } from 'rebass'
import { compose, defaultProps, getContext, setDisplayName } from 'recompose'

import { Cell, HeaderCell } from '../style'

export default compose<ColumnProps, ColumnProps>(
  setDisplayName('column'),
  defaultProps<ColumnProps>({
    name: Math.random().toString()
  }),
  getContext({
    isHeader: bool,
    sort: shape({}),
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
    }

    return (
      <HeaderCell
        onClick={() => sortBy({ name, dir: dir === 'asc' ? 'desc' : 'asc' })}
        {...props}>
        <span style={{ marginRight: 2 }}>{children}</span>

        {sortKey === name && (
          <>
            {dir === 'desc' ? (
              <FaCaretDown size={13} />
            ) : (
              <FaCaretUp size={13} />
            )}
          </>
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
