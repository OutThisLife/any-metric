import * as faker from 'faker'
import { GraphQLDateTime } from 'graphql-iso-date'
import { IResolvers } from 'graphql-tools'
import * as GraphQLJSON from 'graphql-type-json'

import { setLayout } from './mutations'
import { crawl, layout, search } from './queries'
import { Context, FakeCrawlResult, Result } from './types'

export { crawl, layout, search, setLayout }
export { default as typeDefs } from './types'

export default {
  JSON: GraphQLJSON,
  Date: GraphQLDateTime,

  Query: {
    crawl,
    search,
    layout,
    history: (_, __, ctx): Result[] => ctx.cache.values().filter(o => o.id),

    fakeCrawl: (_, { seed = 100 }): FakeCrawlResult[] => {
      faker.seed(seed)

      return [...Array(255).keys()].map(i => ({
        image: faker.internet.avatar(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        copy: faker.lorem.paragraph(),
        slug: faker.lorem.slug(),
        date: i < 10 ? faker.date.recent() : faker.date.past(),
        tags: faker.random.arrayElement([
          [''],
          ['Important'],
          ['Broken'],
          ['Important', 'Lead']
        ])
      }))
    }
  },

  Mutation: {
    setLayout
  },

  CrawlResult: {
    data: ({ data }: Result, { limit }: { limit?: number }) =>
      data.slice(0, limit)
  }
} as IResolvers<{}, Context>
