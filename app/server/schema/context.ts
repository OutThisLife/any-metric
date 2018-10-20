import * as DataLoader from 'dataloader'
import * as faker from 'faker'
import * as LRU from 'lru-cache'

import { Context, FakeCrawlResult } from './types'

export const cache = LRU({
  max: 152,
  maxAge: 36e2
})

const genFakeResults: Context['genFakeResults'] = async (lru, ids) => {
  if (!lru.has('data')) {
    faker.seed(100)
    lru.set(
      'data',
      [...Array(255).keys()].map(i => ({
        id: faker.random.uuid(),
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
    )
  }

  const data = lru.get('data')

  if (!ids) {
    return data
  }

  return data.filter(({ id }) => ids.includes(id))
}

export default {
  cache,
  genFakeResults,
  fakeResultLoader: lru =>
    new DataLoader<string, FakeCrawlResult>(ids => genFakeResults(lru, ids))
} as Context
