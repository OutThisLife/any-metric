import { dateFormat, sortByDate, unixDateFormat } from './date'
import { getMaxima, processRadar, randomData, smooth } from './maths'

export const flatten = <T extends Array<{ [key: string]: any }>, K = string>(
  arr: T,
  ...keys: string[]
): K[] =>
  arr
    .reduce((acc: K[], r) => {
      keys.forEach(
        key =>
          r[key] instanceof Array ? acc.push(...r[key]) : acc.push(r[key])
      )
      return acc
    }, [])
    .filter((r: K, i, self: K[]) => r && self.indexOf(r) === i)
    .sort()

export const spawn = (fn: () => any): Worker =>
  new Worker(URL.createObjectURL(new Blob([`(${fn})()`])))

export const raf = cb => {
  let t = 0

  window.requestAnimationFrame(() => {
    cb()

    if (t) {
      window.requestAnimationFrame(cb)
      t = 0
    }

    t = 1
  })
}

export {
  dateFormat,
  unixDateFormat,
  sortByDate,
  processRadar,
  getMaxima,
  smooth,
  randomData
}
