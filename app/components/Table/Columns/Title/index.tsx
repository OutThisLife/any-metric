import { MockResult } from '@/server/schema/types'
import { Flex } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { ColumnProps } from '../Column'
import Copy from './Copy'
import Image from './Image'
import Title from './style'

export default compose<TitleProps, TitleProps>(setDisplayName('col-title'))(
  ({ children, item = {} }) => (
    <Title name="title" p={0}>
      {!('id' in item) ? (
        children
      ) : (
        <Flex alignItems="center">
          <Image {...item} />
          <Copy {...item} />
        </Flex>
      )}
    </Title>
  )
)

interface TitleProps extends ColumnProps {
  item?: MockResult
}
