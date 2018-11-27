import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import { IResolvers } from 'graphql-tools'
import * as LRU from 'lru-cache'

import { setTags } from './mutations'
import { fakeCrawl } from './queries'
import typeDefs, { Context } from './types'

const router = express.Router()

const resolvers: IResolvers<{}, Context> = {
  JSON: require('graphql-type-json'),
  Date: require('graphql-iso-date').GraphQLDateTime,

  Query: {
    fakeCrawl
  },

  Mutation: {
    setTags
  }
}

module.exports = ({
  app,
  cache,
  dev = false
}: {
  app: express.Express
  cache: LRU.Cache<any, any>
  dev?: boolean
}) => {
  new ApolloServer({
    typeDefs,
    resolvers,
    context: { cache },
    introspection: dev,
    playground: dev,
    tracing: dev,
    cacheControl: true
  }).applyMiddleware({ app })

  return router
}
