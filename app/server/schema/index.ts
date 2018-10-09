import { tsvParse } from 'd3-dsv'
import * as faker from 'faker'
import { IResolvers } from 'graphql-tools'
import * as GraphQLJSON from 'graphql-type-json'
import * as LRU from 'lru-cache'

import { setLayout } from './mutations'
import { crawl, layout, search } from './queries'
import { Context, FakeCrawlResult, FakeStockResult, Result } from './types'

export const cache = LRU({
  max: 152,
  maxAge: 36e2
})

export { crawl, layout, search, setLayout }
export { default as typeDefs } from './types'

export default {
  JSON: GraphQLJSON,

  Query: {
    crawl,
    search,
    layout,
    history: (_, __, ctx): Result[] => ctx.cache.values().filter(o => o.id),

    fakeCrawl: (_, { seed = 100 }): FakeCrawlResult[] => {
      faker.seed(seed)

      return [...Array(255).keys()].map(() => ({
        image: faker.internet.avatar(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        copy: faker.lorem.paragraph(),
        slug: faker.lorem.slug()
      }))
    },

    fakeStock: async (): Promise<FakeStockResult[]> => {
      const fetch = require('isomorphic-unfetch')
      const data = await (await fetch('https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv')).text()
      return tsvParse(data)
    }
  },

  CrawlResult: {
    data: ({ data }: Result, { limit }: { limit?: number }) => data.slice(0, limit)
  },

  Mutation: {
    setLayout
  }
} as IResolvers<{}, Context>
