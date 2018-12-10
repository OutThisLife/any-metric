import Text from '@/components/Text'
import { Product } from '@/server/schema/types'
import { MdOpenInNew } from 'react-icons/md'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { ColumnProps } from '../Column'
import Title from './style'

export default compose<TitleProps, TitleProps>(setDisplayName('col-title'))(
  ({ children, item = {} }) => (
    <Title name="title" p={0}>
      {!('_id' in item) ? (
        children
      ) : (
        <Box>
          <Text
            as="a"
            href={`//twitter.com/${item.slug}`}
            target="_blank"
            tabIndex={-1}
            rel="noopener">
            {item.title} <MdOpenInNew />
          </Text>
        </Box>
      )}
    </Title>
  )
)

interface TitleProps extends ColumnProps {
  item?: Product
}
