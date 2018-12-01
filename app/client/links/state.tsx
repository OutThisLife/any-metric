import { InMemoryCache } from 'apollo-boost'
import { withClientState } from 'apollo-link-state'

const resolvers = {
  Mutation: {
    setTheme: (_, vars, { cache }) => {
      const theme = JSON.stringify(vars.theme)
      cache.writeData({ data: { theme } })
      return null
    }
  }
}

export default (cache: InMemoryCache) =>
  withClientState({
    cache,
    resolvers
  })
