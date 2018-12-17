import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import { withClientState } from 'apollo-link-state'

export default () =>
  createPersistedQueryLink().concat(
    withClientState({
      defaults: {
        watchlist: []
      },
      resolvers: {
        Mutation: {
          updateWatchlist: (_, { watchlist }, { cache }) => {
            cache.writeData({ data: { watchlist } })
            return watchlist
          }
        }
      }
    })
  )
