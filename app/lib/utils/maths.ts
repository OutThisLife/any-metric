import dayjs from 'dayjs'
import faker from 'faker'
import { ema } from 'moving-averages'

import { flatten } from '.'

export const randomData = ({
  min = 40,
  max = 50,
  seed = 100,
  count = 50
}): DataPoint[] => {
  faker.seed(seed)

  return [...Array(count).keys()].map(i => ({
    x: dayjs().add(i, 'day'),
    y: faker.random.number({
      min,
      max
    })
  }))
}

export const smooth = (r: DataPoint[]): DataPoint[] => {
  const s = ema(flatten(r, 'y'), 8)
  const diff = r.length / s.length + 1

  return r.map(({ x }, i) => ({
    x,
    y: s[Math.min(s.length, Math.round(i / diff))]
  }))
}

export const groupByKeys = r =>
  Object.keys(r[0]).reduce((m, i) => (m[i] = r.map(d => d[i])) && m, {})

export const getMaxima = r => {
  const grouped = groupByKeys(r)

  return Object.keys(grouped).reduce(
    (m, i) => (m[i] = Math.max(...grouped[i])) && m,
    {}
  )
}

export const getAvg = r => {
  const grouped = groupByKeys(r)
  return Object.keys(grouped).reduce(
    (m, i) => (m[i] = average(grouped[i])) && m,
    {}
  )
}

export const processRadar = (r, maxByGroup = getMaxima(r)) =>
  r.map(d => Object.keys(d).map(x => ({ x, y: d[x] / maxByGroup[x] })))

const average = (arr: number[]): number =>
  arr.reduce((p, c) => p + c, 0) / arr.length
