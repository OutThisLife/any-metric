import Popover from '@/components/Popover'
import { positionToMouse } from '@/lib/withPortal'
import { Product } from '@/server/schema/types'
import { IoMdImage } from 'react-icons/io'
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
    ) : item.image.length ? (
      <Popover
        id={`popover-${item._id}`}
        direction="right"
        render={() => <img ref={onRef} src={item.image} />}>
        {({ toggle }) => (
          <Box
            as="figure"
            css={`
              cursor: zoom-in;
            `}>
            <img
              data-src={item.image}
              onMouseEnter={() => toggle(true)}
              onMouseLeave={() => toggle(false)}
            />

            <img data-src={item.image} />
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
