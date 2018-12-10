import * as faker from 'faker'

import { Product, Resolver } from '../../types'

export default (async (_, args = {}): Promise<Product[]> =>
  await (create(args) || [])) as Resolver

const create: (
  args: {
    ids?: string[]
    offset?: number
    limit?: number
  }
) => Promise<Product[]> = async ({ ids = [], offset = 0, limit = 25 }) => {
  faker.seed(100)

  const data = [...Array(255).keys()].map(i => ({
    _id: faker.random.uuid(),
    createdAt: i < 10 ? faker.date.recent(1) : faker.date.past(1),
    slug: faker.lorem.slug(),
    title: faker.commerce.productName(),
    image: faker.internet.avatar(),
    price: parseFloat(faker.commerce.price()),
    shipping: parseFloat(faker.commerce.price(0, 100)),
    bids: faker.random.number({ min: 1, max: 50 }),
    qty: faker.random.number({ min: 1, max: 20 }),
    tags: faker.random.arrayElement([
      ['DataMan 8050', 'Important'],
      ['Keyence CV', 'Broken'],
      ['Keyence CV', 'Something'],
      ['Cognex Cables', 'Important'],
      ['Cognex Cables', 'Important', 'Lead']
    ])
  }))

  if (ids.length) {
    return data.filter(({ _id }) => ids.includes(_id))
  }

  return data.slice(offset, limit)
}
