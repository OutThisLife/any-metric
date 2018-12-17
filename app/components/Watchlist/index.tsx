import Module from '@/components/Module'
import { getWatchlist, SET_WATCHLIST } from '@/lib/queries'
import { Product } from '@/server/schema/types'
import { graphql } from 'react-apollo'
import { branch, compose, renderComponent, setDisplayName } from 'recompose'

import Item from './Item'

export default compose<WatchlistProps, {}>(
  setDisplayName('watchlist'),
  getWatchlist(),
  branch<WatchlistProps>(
    ({ watchlist = [] }) => !watchlist.length,
    renderComponent(() => null)
  ),
  graphql<WatchlistProps, {}, {}, WatchlistProps>(SET_WATCHLIST, {
    props: ({ mutate, ownProps: { watchlist } }) => ({
      handleClick: async item => {
        const idx = watchlist.findIndex(t => t._id === item._id)

        if (idx === -1) {
          watchlist.push(item)
        } else {
          watchlist.splice(idx, 1)
        }

        await mutate({
          refetchQueries: ['getWatchlist'],
          variables: { watchlist }
        })
      }
    })
  })
)(({ watchlist }) => (
  <Module
    css={`
      margin-top: var(--pad);
    `}>
    {watchlist.map(d => (
      <Item key={d._id} {...d} />
    ))}
  </Module>
))

export interface WatchlistProps {
  watchlist?: Product[]
  handleClick?: (item: Product) => void
}
