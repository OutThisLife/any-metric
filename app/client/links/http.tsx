import { createHttpLink } from 'apollo-link-http'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { API_URL }
} = getConfig()

export default () =>
  createPersistedQueryLink().concat(
    createHttpLink({
      uri: API_URL,
      credentials: 'same-origin'
    })
  )
