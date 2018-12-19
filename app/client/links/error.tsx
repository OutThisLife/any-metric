import { onError } from 'apollo-link-error'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { isDev }
} = getConfig()

export default () =>
  onError(({ graphQLErrors, networkError }) => {
    if (!isDev) {
      return
    }

    if (graphQLErrors) {
      console.log(JSON.stringify(graphQLErrors, null, 1))
    }

    if (networkError) {
      console.error('[Network error]', networkError)
    }
  })
