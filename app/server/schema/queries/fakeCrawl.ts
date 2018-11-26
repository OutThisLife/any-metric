import * as faker from 'faker'

import { FakeResult, Resolver } from '../types'

faker.seed(100)

export default (async (): Promise<FakeResult[]> =>
  (await genFakeResults()) || []) as Resolver

export const genFakeResults: (
  ids?: string[]
) => Promise<FakeResult[]> = async ids => {
  const data = [...Array(255).keys()].map(i => ({
    id: faker.random.uuid(),
    slug: faker.lorem.slug(),
    title: faker.commerce.productName(),
    image: faker.internet.avatar(),
    price: faker.commerce.price(),
    shipping: faker.commerce.price(0, 100),
    bids: faker.random.number({ min: 1, max: 50 }).toString(),
    quantity: faker.random.number({ min: 1, max: 20 }).toString(),
    copy: faker.lorem.paragraph(),
    date: i < 10 ? faker.date.recent(1) : faker.date.past(1),
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
