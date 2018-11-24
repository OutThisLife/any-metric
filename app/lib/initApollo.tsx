import 'isomorphic-unfetch'

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost'
import { onError } from 'apollo-link-error'
import { toIdValue } from 'apollo-utilities'
import getConfig from 'next/config'

import typeDefs from '../server/schema/types'

const {
  publicRuntimeConfig: { API_URL, isDev }
} = getConfig()

// --------------------------------

const errorLink = onError(({ graphQLErrors, networkError }) => {
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

let client
const create = (initialState = {}) => {
  const cache = new InMemoryCache({
    dataIdFromObject: o => ('id' in o ? `${o.__typename}:${o.id}` : null),
    cacheRedirects: {
      Query: typeDefs.definitions
        .find(s => /query|mutation/i.test(s.name.value))
        .fields.map(({ name, type }) => ({
          [name.value]: (_, args = {}, { cache: imc }) =>
            toIdValue(
              imc.config.dataIdFromObject({
                __typename:
                  type.kind === 'ListType'
                    ? `[${type.type.name.value}]`
                    : type.name.value,
                ...args
              })
            )
        }))
    }
  })

  return new ApolloClient({
    link: ApolloLink.from([errorLink, new HttpLink({ uri: API_URL })]),
    cache: cache.restore(initialState),
    ssrMode: !('browser' in process),
    connectToDevTools: 'browser' in process && isDev,
    ssrForceFetchDelay: 100
  })
}
// --------------------------------

export default (initialState = {}): ApolloClient<{}> => {
  if (!('browser' in process)) {
    return create(initialState)
  }

  if (!client) {
    client = create((window as any).__NEXT_DATA__.props.apolloState || {})
  }

  return client
}
