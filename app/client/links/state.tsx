import { withClientState } from 'apollo-link-state'

export default () =>
  withClientState({
    defaults: {},
    resolvers: {}
  })
