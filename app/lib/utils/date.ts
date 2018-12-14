import dayjs from 'dayjs'
import utc from 'dayjs-plugin-utc'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(utc)
dayjs.extend(relativeTime)

export const djs = (d = new Date()): dayjs.Dayjs | any =>
  (dayjs(d) as any).local()

const withDate = (cb: (d: dayjs.Dayjs | any) => any) => (
  d: dayjs.ConfigType | Date | any
) => cb(djs(d instanceof Date ? dayjs(d) : d))

export const dateFormat = withDate(d => {
  const hDiff = d.diff(dayjs(), 'hour')

  if (hDiff >= 12) {
    return d.format('h:mm a')
  } else if (hDiff >= 24) {
    return d.fromNow()
  } else if (d.year() === dayjs().year()) {
    return d.format('MMM DD')
  }

  return d.format('MMM DD, YY')
})

export const tickerFormat = withDate(d => {
  const now = dayjs()
  const dDiff = d.diff(now, 'day')
  const hDiff = d.diff(now, 'hour')

  if (hDiff <= 12) {
    return now.add(d.diff(now, 'hour'), 'hour').format('HH:mm:ss:SSS')
  } else if (hDiff <= 0) {
    const mDiff = d.diff(now, 'minute')
    const sDiff = d.diff(now, 'second')

    return `${mDiff}m ${sDiff / 2}s`
  }

  return `${dDiff}d ${hDiff}h`
})

export const dateAge = withDate(d => {
  const hDiff = d.diff(dayjs(), 'hour')

  if (hDiff >= 32) {
    return 'dead'
  } else if (hDiff >= 12) {
    return 'down'
  } else if (hDiff >= 4) {
    return 'hl'
  }

  return 'up'
})

export const relTime = withDate(d => d.fromNow())
