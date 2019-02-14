import { dateFormat } from '@/lib/utils'
import { Product } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { ColumnProps } from '..'

export default compose<TitleProps & TitleState, TitleProps>(
  setDisplayName('col-title')
)(({ item }) => (
  <Box
    name="title"
    p={0}
    css={`
      padding: 0 !important;
      justify-content: flex-start !important;
      font-weight: 600;
      text-transform: uppercase;

      a[href][id]:hover & {
        text-decoration: underline;
      }
    `}>
    <time
      dangerouslySetInnerHTML={{
        __html: `${dateFormat(item.createdAt)}&nbsp;&mdash;&nbsp;`
      }}
    />
    <span dangerouslySetInnerHTML={{ __html: item.title }} />
  </Box>
))

interface TitleProps extends ColumnProps {
  item?: Product
  watchlist?: Product[]
}

interface TitleState {
  isFav?: boolean
  handleClick?: React.MouseEventHandler<any>
}
