import 'isomorphic-unfetch'

import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost'
import { toIdValue } from 'apollo-utilities'
import getConfig from 'next/config'

import { errorLink, httpLink, stateLink } from './links'

const {
  publicRuntimeConfig: { isDev }
} = getConfig()

let client

const createCache = (): InMemoryCache => {
  const redir = typeName => (_, args = {}) =>
    toIdValue(
      cache.config.dataIdFromObject({
        __typename: typeName,
        ...args
      })
    )

  const cache = new InMemoryCache({
    dataIdFromObject: o => (o.id ? `${o.__typename}:${o.id}` : null),
    cacheRedirects: {
      Query: {
        pages: redir('[Page]')
      }
    }
  })

  return cache
}

const create = initialState => {
  const cache = createCache().restore(initialState)
  const link = ApolloLink.from([errorLink(), stateLink(), httpLink()])

  return new ApolloClient({
    link,
    cache,
    ssrMode: !('browser' in process),
    connectToDevTools: 'browser' in process && isDev
  })
}

export default (initialState = {}) => {
  if (!('browser' in process)) {
    return create(initialState)
  }

  if (!client) {
    client = create(
      initialState || (window as any).__NEXT_DATA__.props.apolloState
    )
  }

  return client
}
