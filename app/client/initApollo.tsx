import 'isomorphic-unfetch'

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-boost'
import { persistCache } from 'apollo-cache-persist'
import getConfig from 'next/config'

import { errorLink, httpLink, stateLink } from './links'

const {
  publicRuntimeConfig: { isDev }
} = getConfig()

let client

const createCache = (): InMemoryCache => {
  const cache = new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: require('../static/fragmentTypes.json')
    }),
    dataIdFromObject: (o: any) => (o._id ? `${o.__typename}:${o._id}` : null)
  })

  if ('browser' in process) {
    ;(async () =>
      await persistCache({
        cache,
        maxSize: 1048576,
        storage: window.localStorage,
        debug: isDev,
        trigger: 'background',
        debounce: 1000
      }))()
  }

  return cache
}

const create = initialState => {
  const cache = createCache().restore(initialState)
  const link = ApolloLink.from([stateLink(), errorLink(), httpLink()])

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
