import 'isomorphic-unfetch'

import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost'
import getConfig from 'next/config'

import { errorLink, httpLink } from './links'

const {
  publicRuntimeConfig: { isDev }
} = getConfig()

let client

const createCache = (): InMemoryCache =>
  new InMemoryCache({
    dataIdFromObject: o => (o.id ? `${o.__typename}:${o.id}` : null)
  })

const create = initialState => {
  const cache = createCache().restore(initialState)
  const link = ApolloLink.from([errorLink(), httpLink()])

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
