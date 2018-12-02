import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import { IResolvers } from 'graphql-tools'
import * as LRU from 'lru-cache'

import defaultTheme from '../../theme'
import { fakeCrawl } from './queries'
import typeDefs, { Context } from './types'

const router = express.Router()

const resolvers: IResolvers<{}, Context> = {
  JSON: require('graphql-type-json'),
  Date: require('graphql-iso-date').GraphQLDateTime,

  Query: {
    theme: (_, __, { cache }) => ({
      value: cache.get('theme') || JSON.stringify(defaultTheme)
    }),

    fakeCrawl
  },

  Mutation: {
    setTheme: (_, { theme }, { cache }) => {
      cache.set('theme', theme)
      return { value: theme }
    }
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
