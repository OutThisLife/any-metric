import Popover from '@/components/Popover'
import { positionToMouse } from '@/lib/withPortal'
import { Product } from '@/server/schema/types'
import { IoMdImage } from 'react-icons/io'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers } from 'recompose'

import { ColumnProps } from '..'
import Image from './style'

export default compose<ImageProps, ImageProps>(
  setDisplayName('col-image'),
  withHandlers<ImageProps, ImageProps>(() => ({
    onRef: ({ item: { _id } }) => ref =>
      ref instanceof HTMLElement &&
      positionToMouse(document.getElementById(`popover-${_id}`), ref, 'right')
  }))
)(({ onRef, item }) => (
  <Image name="image">
    {item.image.length ? (
      <Popover
        id={`popover-${item._id}`}
        direction="right"
        render={() => <img ref={onRef} src={item.image} />}>
        {({ toggle }) => (
          <Box as="figure">
            <a
              href={item.url}
              target="_blank"
              rel="noopener"
              onMouseEnter={() => toggle(true)}
              onMouseLeave={() => toggle(false)}
              style={{ cursor: 'zoom-in' }}>
              <img src={item.image} />
              <img src={item.image} />
            </a>
          </Box>
        )}
      </Popover>
    ) : (
      <IoMdImage />
    )}
  </Image>
))

interface ImageProps extends ColumnProps {
  item?: Product
  onRef?: (ref?: HTMLElement) => void
}
