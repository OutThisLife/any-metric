import dayjs from 'dayjs'
import faker from 'faker'
import { DataPoint } from 'typings'

export const randomData = ({ min = 40, max = 50, count = 50 }): DataPoint[] =>
  [...Array(count).keys()].map(i => ({
    x: dayjs().add(i, 'day'),
    y: faker.random.number({
      min,
      max
    })
  }))

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

export const average = (arr: number[]): number =>
  arr.reduce((p, c) => p + c, 0) / arr.length

export const random = <T extends string>(r: { [key: string]: any }): T =>
  Object.values(r)[Math.floor(Math.random() * Object.values(r).length)]
