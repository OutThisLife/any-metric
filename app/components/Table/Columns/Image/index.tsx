import Popover from '@/components/Popover'
import { positionToMouse } from '@/lib/withPortal'
import { Product } from '@/server/schema/types'
import { IoMdImage } from 'react-icons/io'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers } from 'recompose'

import { ColumnProps } from '..'

export default compose<ImageProps, ImageProps>(
  setDisplayName('col-image'),
  withHandlers<ImageProps, ImageProps>(() => ({
    onRef: ({ item: { _id } }) => ref =>
      ref instanceof HTMLElement &&
      positionToMouse(document.getElementById(`popover-${_id}`), ref, 'right')
  }))
)(({ onRef, item }) => (
  <Box
    name="image"
    css={`
      padding: 0 !important;

      figure {
        position: relative;
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;

        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
    `}>
    {item.image.length ? (
      <Popover
        id={`popover-${item._id}`}
        direction="right"
        render={() => <img ref={onRef} src={item.image} />}>
        {({ toggle }) => (
          <Box
            as="figure"
            onMouseEnter={() => toggle(true)}
            onMouseLeave={() => toggle(false)}
            style={{ cursor: 'zoom-in' }}>
            <img src={item.image} />
          </Box>
        )}
      </Popover>
    ) : (
      <IoMdImage />
    )}
  </Box>
))

interface ImageProps extends ColumnProps {
  item?: Product
  onRef?: (ref?: HTMLElement) => void
}
