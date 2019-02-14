import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { ColumnProps } from '../'

export default compose<ColumnProps, ColumnProps>(
  setDisplayName('col-datetime')
)(({ item }) => (
  <Box
    name="createdAt"
    css={`
      color: ${({ theme }) => theme.colours.label};
    `}
    dangerouslySetInnerHTML={{ __html: item.status }}
  />
))
