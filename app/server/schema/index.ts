import * as faker from 'faker'
import { IResolvers } from 'graphql-tools'
import * as GraphQLJSON from 'graphql-type-json'
import * as LRU from 'lru-cache'

import { setLayout } from './mutations'
import { crawl, layout, search } from './queries'
import { Context, FakeData, Result } from './types'

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
    fake: (_, { seed = 100 }): FakeData[] => {
      faker.seed(seed)

      return [...Array(255).keys()].map(() => ({
        image: faker.internet.avatar(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        copy: faker.lorem.paragraph(),
        slug: faker.lorem.slug()
      }))
    }
  },

  Mutation: {
    setLayout
  },

  CrawlResult: {
    data: ({ data }: Result, { limit }: { limit?: number }) => data.slice(0, limit)
  }
} as IResolvers<{}, Context>
