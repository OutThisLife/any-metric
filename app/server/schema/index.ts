import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import { IResolvers } from 'graphql-tools'

import { app, cache, dev } from '..'
import { setTags } from './mutations'
import { fakeCrawl } from './queries'
import typeDefs, { Context } from './types'

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

new ApolloServer({
  typeDefs,
  resolvers,
  context: { cache },
  introspection: dev,
  playground: dev,
  tracing: dev,
  cacheControl: true
}).applyMiddleware({ app })

module.exports = express.Router()
