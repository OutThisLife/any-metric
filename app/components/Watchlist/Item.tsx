import Text from '@/components/Text'
import { dateFormat, moneyFormat } from '@/lib/utils'
import { positionToMouse } from '@/lib/withPortal'
import { Product, Tag } from '@/server/schema/types'
import { IoMdImage, IoMdStar } from 'react-icons/io'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers } from 'recompose'

import Popover from '../Popover'
import TagLabel from '../TagLabel'
import Item from './Item.style'

export default compose<WatchlistItemProps, WatchlistItemProps>(
  setDisplayName('watchlist-item'),
  withHandlers<WatchlistItemProps, WatchlistItemProps>(() => ({
    onRef: item => ref =>
      ref instanceof HTMLElement &&
      positionToMouse(
        document.getElementById(`popover-${item._id}`),
        ref,
        'top',
        ref.clientHeight
      )
  }))
)(({ onRef, onDelete, ...item }) => (
  <Item as="article" alignItems="center">
    <Text
      as="div"
      fontWeight="600"
      className="up"
      css={`
        justify-self: flex-start;
      `}>
      {moneyFormat(item.price)}
    </Text>

    <Box>
      {item.image.length ? (
        <Popover
          id={`popover-${item._id}`}
          render={() => <img ref={onRef} src={item.image} />}>
          {({ toggle }) => (
            <Box
              as="figure"
              css={`
                cursor: zoom-in;
              `}>
              <img
                src={item.image}
                onMouseEnter={() => toggle(true)}
                onMouseLeave={() => toggle(false)}
              />
            </Box>
          )}
        </Popover>
      ) : (
        <Box as="figure">
          <IoMdImage />
        </Box>
      )}
    </Box>

    <Text
      css={`
        display: flex;
        justify-self: flex-start;
        align-items: center;
        font-weight: 600;

        svg {
          cursor: pointer;
          width: 1em;
          margin-right: 0.5em;
        }
      `}>
      <IoMdStar className="favourite hl" onClick={onDelete} />
      <a href={item.url} target="_blank" rel="noopener">
        {item.title}
      </a>
    </Text>

    <Text
      as="time"
      css={`
        font-size: 0.85rem;
      `}>
      {dateFormat(item.createdAt)}
    </Text>

    <Box
      css={`
        justify-self: flex-end;
      `}>
      {(item.tags as Tag[])
        .filter(t => !t.isQuery)
        .map(t => (
          <TagLabel
            key={t._id}
            css={`
              font-size: 0.85rem;
            `}
            {...t}
          />
        ))}
    </Box>
  </Item>
))

interface WatchlistItemProps extends Partial<Product> {
  onRef?: (ref: HTMLElement) => void
  onDelete?: React.MouseEventHandler<any>
}
