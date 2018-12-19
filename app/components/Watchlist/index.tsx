import Text from '@/components//Text'
import { getWatchlist, SET_WATCHLIST } from '@/lib/queries'
import withDraggable, { DraggableProps } from '@/lib/withDraggable'
import withHotkeys from '@/lib/withHotkeys'
import { Product } from '@/server/schema/types'
import { omit } from 'lodash'
import { graphql } from 'react-apollo'
import { FaChevronRight } from 'react-icons/fa'
import { Box, BoxProps } from 'rebass'
import { compose, mapProps, setDisplayName, withState } from 'recompose'

import Module from '../Module'
import Item from './Item'
import Watchlist from './style'

export default compose<WatchlistState & WatchlistProps, WatchlistProps>(
  setDisplayName('watchlist'),
  withState('isOpen', 'toggle', false),
  withHotkeys<WatchlistState>([
    {
      key: 87,
      action: ({ isOpen, toggle }) => toggle(!isOpen)
    }
  ]),
  getWatchlist(),
  graphql<WatchlistProps & WatchlistState, {}, {}, WatchlistProps>(
    SET_WATCHLIST,
    {
      props: ({ mutate, ownProps: { watchlist } }) => ({
        handleDelete: async item => {
          watchlist.splice(watchlist.findIndex(t => t._id === item._id), 1)

          await mutate({
            refetchQueries: ['getWatchlist'],
            variables: { watchlist }
          })
        }
      })
    }
  ),
  withDraggable(),
  mapProps(props => omit(props, ['data']))
)(({ isOpen, toggle, watchlist, handleDelete, dragHandle, ...props }) => (
  <Watchlist
    id="watchlist"
    data-draggable
    data-open={isOpen}
    onClick={() => toggle(!isOpen)}
    {...props}>
    <Module>
      <h5 ref={dragHandle}>{isOpen ? 'watchlist' : <FaChevronRight />}</h5>

      <Box
        css={`
          padding: var(--pad);
        `}>
        <Box as="section" onWheel={e => e.stopPropagation()}>
          {watchlist.length ? (
            watchlist.map(d => (
              <Item key={d._id} {...d} onDelete={() => handleDelete(d)} />
            ))
          ) : (
            <Text style={{ gridColumn: '1 / -1' }}>
              Click the star next to products to pin them here.
            </Text>
          )}
        </Box>
      </Box>
    </Module>
  </Watchlist>
))

export interface WatchlistState extends DraggableProps {
  isOpen?: boolean
  toggle?: (b: boolean, cb?: () => void) => void
}

export interface WatchlistProps extends BoxProps {
  as?: any
  watchlist?: Product[]
  handleDelete?: (item: Product) => void
}
