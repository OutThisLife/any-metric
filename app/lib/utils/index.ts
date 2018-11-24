import { dateFormat, sortByDate, unixDateFormat } from './date'
import { getMaxima, processRadar, randomData, smooth } from './maths'

export const random = <T extends string>(r: { [key: string]: any }): T =>
  Object.values(r)[Math.floor(Math.random() * Object.values(r).length)]

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
