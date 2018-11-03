import { getMaxima, processRadar, randomData } from '@/lib/utils'
import { getAvg } from '@/lib/utils/maths'
import theme, { autoColour } from '@/theme'
import faker from 'faker'
import { func, string } from 'prop-types'
import {
  compose,
  getContext,
  setDisplayName,
  withPropsOnChange
} from 'recompose'

import { DataTableFilter } from '../..'

export interface TInner {
  current?: string
  filter?: DataTableFilter
  mocks: {
    price?: any[]
    quantity?: Partial<{ data: any[] }>
    sentiment?: any[]
    volume?: any[]
  }
}

export default compose<TInner, {}>(
  setDisplayName('mocks'),
  getContext({ filter: func, current: string }),
  withPropsOnChange<TInner, { current: string }>(['current'], ({ current }) => {
    const applyColour = (d: any, i: number): string => ({
      ...d,
      colour:
        i === 0
          ? theme.colours.secondary
          : autoColour(current, true).backgroundColor
    })

    const volume = (_, i) =>
      randomData({
        min: 10,
        max: 60
      }).map(d => applyColour(d, i))

    const price = (_, i) =>
      randomData({
        count: 10,
        min: 3000,
        max: 5000
      }).map(d => applyColour(d, i))

    const sentiment = (_, i) =>
      randomData({ count: 1, min: 25, max: 100 }).map(d => applyColour(d, i))

    const quantity = () => ({
      source: [...Array(3).keys()].map(() => ({
        ebay: faker.random.number({ min: 100, max: 200 }),
        amazon: faker.random.number({ min: 100, max: 200 }),
        facebook: faker.random.number({ min: 100, max: 200 }),
        baidu: faker.random.number({ min: 100, max: 200 }),
        listia: faker.random.number({ min: 100, max: 200 })
      })),
      get data() {
        return processRadar(this.source)
      },
      get maxima() {
        return getMaxima(this.source)
      },
      get avg() {
        return getAvg(this.source)
      }
    })

    const createSet = (cb: (a: any, i: number) => any) =>
      [...Array(current.length ? 2 : 1).keys()].map(cb)

    return {
      mocks: {
        price: createSet(price),
        quantity: quantity(),
        sentiment: createSet(sentiment),
        volume: createSet(volume)
      }
    }
  })
)
