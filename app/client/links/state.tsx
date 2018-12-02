import { InMemoryCache } from 'apollo-boost'
import { withClientState } from 'apollo-link-state'

const resolvers = {
  defaults: {
    theme: ''
  },
  Mutation: {
    setTheme: (_, { theme }, { cache }) => {
      cache.writeData({ data: { theme } })
      return theme
    }
  }
}

export default (cache: InMemoryCache) =>
  withClientState({
    cache,
    resolvers
  })
