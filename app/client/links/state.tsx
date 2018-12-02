import defaultTheme from '@/theme'
import { InMemoryCache } from 'apollo-boost'
import { withClientState } from 'apollo-link-state'

export default () =>
  withClientState({
    cache: new InMemoryCache(),
    defaults: {
      theme: (() => {
        if ('browser' in process && localStorage.getItem('theme') !== null) {
          return localStorage.getItem('theme')
        }

        return JSON.stringify(defaultTheme)
      })()
    },
    resolvers: {
      Mutation: {
        setTheme: (_, { theme }, { cache }) => {
          cache.writeData({ data: { theme } })
          localStorage.setItem('theme', theme)
          return null
        }
      }
    }
  })
