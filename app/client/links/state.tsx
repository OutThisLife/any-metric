import { withClientState } from 'apollo-link-state'

export default () =>
  withClientState({
    defaults: {
      'watchlist@client': [],
    },
    resolvers: {
      Mutation: {
        updateWatchlist: (_, { watchlist }, { cache }) => {
          cache.writeData({ data: { watchlist } })
          return null
        }
      }
    }
  })
