import Popover from '@/components/Popover'
import { MockResult } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { ColumnProps } from '../Column'
import Image from './style'

export default compose<ImageProps, ImageProps>(setDisplayName('col-image'))(
  ({ children, item = {} }) => (
    <Image name="image" disableSort>
      {!('id' in item) ? (
        children
      ) : (
        <Popover
          id={`popover-${item.id}`}
          direction="right"
          render={() => <img src={item.image} alt={item.title} />}>
          {({ toggle }) => (
            <Box
              as="figure"
              css={`
                cursor: zoom-in;
              `}>
              <img
                src={item.image}
                alt={item.title}
                onMouseEnter={() => toggle(true)}
                onMouseLeave={() => toggle(false)}
              />

              <img src={item.image} />
            </Box>
          )}
        </Popover>
      )}
    </Image>
  )
)

interface ImageProps extends ColumnProps {
  item?: MockResult
}
