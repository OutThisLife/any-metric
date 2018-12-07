import Tag from '@/components/Tag'
import { MockResult } from '@/server/schema/types'
import { Flex } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { ColumnProps } from '../Column'
import Tags from './style'

export default compose<TagProps, TagProps>(setDisplayName('col-tags'))(
  ({ children, item = {} }) => (
    <Tags name="tags" p={0} disableSort>
      {!('id' in item) ? (
        children
      ) : (
        <Flex alignItems="center">
          {item.tags.map(t => (
            <Tag key={t} title={t} />
          ))}
        </Flex>
      )}
    </Tags>
  )
)

interface TagProps extends ColumnProps {
  item?: MockResult
}
