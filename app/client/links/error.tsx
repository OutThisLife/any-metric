import { onError } from 'apollo-link-error'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { isDev }
} = getConfig()

export default () =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(
        ({ message, locations, path }) =>
          isDev &&
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
              locations
            )}, Path: ${path}`
          )
      )
    }

    if (networkError && isDev) {
      console.error('[Network error]', networkError)
    }
  })
