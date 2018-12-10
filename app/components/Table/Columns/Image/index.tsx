import Popover from '@/components/Popover'
import { positionToMouse } from '@/lib/withPortal'
import { Product } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers } from 'recompose'

import { ColumnProps } from '../Column'
import Image from './style'

export default compose<ImageProps, ImageProps>(
  setDisplayName('col-image'),
  withHandlers<ImageProps, ImageProps>(() => ({
    onRef: ({ item: { _id } }) => ref =>
      ref instanceof HTMLElement &&
      positionToMouse(document.getElementById(`popover-${_id}`), ref, 'right')
  }))
)(({ onRef, children, item = {} }) => (
  <Image name="image" disableSort>
    {!('_id' in item) ? (
      children
    ) : (
      <Popover
        id={`popover-${item._id}`}
        direction="right"
        render={() => <img ref={onRef} src={item.image} alt={item.title} />}>
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
))

interface ImageProps extends ColumnProps {
  item?: Product
  onRef?: (ref?: HTMLElement) => void
}
