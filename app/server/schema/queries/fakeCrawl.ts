import * as faker from 'faker'

import { FakeCrawlResult, Resolver } from '../types'

export default (async (): Promise<FakeCrawlResult[]> =>
  (await genFakeResults()) || []) as Resolver

export const genFakeResults: (
  ids?: string[]
) => Promise<FakeCrawlResult[]> = async ids => {
  faker.seed(100)

  const data = [...Array(255).keys()].map(i => ({
    id: faker.random.uuid(),
    slug: faker.lorem.slug(),
    title: faker.commerce.productName(),
    image: faker.internet.avatar(),
    price: faker.commerce.price(),
    shipping: faker.commerce.price(0, 100),
    quantity: faker.random.number({ min: 1, max: 20 }).toString(),
    copy: faker.lorem.paragraph(),
    date: i < 10 ? faker.date.recent() : faker.date.past(),
    tags: faker.random.arrayElement([
      ['DataMan 8050', 'Important'],
      ['Keyence CV', 'Broken'],
      ['Cognex Cables', 'Important', 'Lead']
    ])
  }))

  if (!ids) {
    return data
  }

  return data.filter(({ id }) => ids.includes(id))
}
