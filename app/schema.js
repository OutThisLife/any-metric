const md5 = require('md5')
const { parse } = require('url')
const LRUCache = require('lru-cache')
const { gql } = require('apollo-server-express')
const GraphQLJSON = require('graphql-type-json')
const XRay = require('x-ray')()

const cache = new LRUCache({
  max: 152,
  maxAge: 36e2
})

exports.context = { cache }

exports.typeDefs = gql`
  scalar JSON

  input Selector {
    parent: String
    name: String
    el: String
  }

  type Result {
    id: ID @isUnique
    title: String
    hostname: String
    url: String
    meta: JSON
    data(limit: Int): JSON
  }

  type SearchResult {
    id: ID @isUnique
    title: String
    hostname: String
    url: String
    meta: JSON
  }

  type Query {
    crawl(url: String!, parent: String!, children: [Selector]!): Result
    search(q: String!): SearchResult
    history: [Result]
  }
`

const crawl = async (root, { url, parent = 'html', children = [] }) => {
  const { hostname } = parse(url)
  const selectors = children.reduce((acc, s) => ((acc[s.name] = s.el), acc), {})
  const id = md5(`${url}${JSON.stringify(selectors)}`)

  if (!cache.has(id)) {
    const { err, title, meta, data } = await XRay(url, {
      title: 'title',
      meta: XRay('meta', [
        {
          name: '@name',
          description: '@content'
        }
      ]),
      data: XRay(parent, [selectors])
    })

    if (err) {
      console.error(err)
      throw err
    }

    cache.set(id, { id, title, meta, hostname, url, data })
  }

  return cache.get(id)
}

const search = async (root, { q }) => {
  const id = md5(`gsearch-${q}`)

  if (!cache.has(id)) {
    const res = await crawl(null, {
      url: `https://www.google.com/search?q=${encodeURIComponent(q)}`,
      parent: '.g',
      children: [{ name: 'url', el: 'a:first-child@href' }]
    })

    try {
      const { href, hostname } = parse(res.data[0].url.split('?q=')[1])
      const url = href.split('&')[0]
      const { title, meta } = await crawl(null, { url })

      cache.set(id, { id, title, meta, hostname, url })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return cache.get(id)
}

exports.resolvers = {
  JSON: GraphQLJSON,
  Query: {
    crawl,
    search,
    history: (root, args, ctx) => ctx.cache.values().filter(o => o.id)
  },
  Result: {
    data: ({ data }, { limit }) => data.slice(0, limit)
  }
}
