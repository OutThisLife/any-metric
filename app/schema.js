const md5 = require('md5')
const LRUCache = require('lru-cache')
const { gql } = require('apollo-server-express')
const GraphQLJSON = require('graphql-type-json')
const XRay = require('x-ray')()

const cache = new LRUCache({
  max: 100,
  maxAge: 36e5
})

exports.typeDefs = gql`
  scalar JSON

  input Selector {
    parent: String
    name: String
    el: String
  }

  type Result {
    id: ID! @isUnique
    data: JSON
  }

  type Query {
    crawl(url: String!, parent: String!, children: [Selector]!): Result
  }
`

exports.resolvers = {
  JSON: GraphQLJSON,
  Query: {
    crawl: async (root, { url, parent = 'body', children }) => {
      const selectors = children.reduce((acc, s) => ((acc[s.name] = s.el), acc), {})
      const id = md5(`${url}${JSON.stringify(selectors)}`)

      if (cache.has(id)) {
        return cache.get(id)
      }

      const { err, data } = await XRay(url, {
        data: XRay(parent, [selectors])
      })

      if (err) {
        console.error(err)
        throw err
      }

      cache.set(id, { id, data })
      return cache.get(id)
    }
  }
}
