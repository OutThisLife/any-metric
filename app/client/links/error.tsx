import { onError } from 'apollo-link-error'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { isDev }
} = getConfig()

export default () =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors && isDev) {
      console.table(JSON.stringify(graphQLErrors, null, 2))
    }

    if (networkError && isDev) {
      console.error('[Network error]', networkError)
    }
  })
