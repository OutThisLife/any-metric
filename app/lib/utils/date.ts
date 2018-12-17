import dayjs from 'dayjs'
import utc from 'dayjs-plugin-utc'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(utc)
dayjs.extend(relativeTime)

export const djs = (d = new Date()): dayjs.Dayjs | any =>
  (dayjs(d) as any).local()

export const withDate = (cb: (d: dayjs.Dayjs | any) => any) => (
  d: dayjs.ConfigType | Date | any
) => cb(djs(d instanceof Date ? dayjs(d) : d))

export const dateFormat = withDate(d => {
  const hDiff = d.diff(dayjs(), 'hour')

  if (hDiff >= 12) {
    return d.format('h:mm a')
  } else if (hDiff >= 24) {
    return d.fromNow()
  }

  return d.format('MMM DD, YY')
})

export const tickerFormat = withDate(d => {
  const now = dayjs()
  const dDiff = d.diff(now, 'day')
  const hDiff = d.diff(now, 'hour') % 24
  const mDiff = d.diff(now, 'minute') % 50
  const sDiff = d.diff(now, 'second') % 60

  if (hDiff <= 12) {
    return `${hDiff}h ${mDiff}m ${sDiff}s`
  } else if (dDiff >= 1) {
    return `${dDiff}d ${hDiff}h`
  }

  return `${mDiff}m ${sDiff}s`
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
export const shouldRefresh = withDate(d => dayjs().diff(d, 'hour', true) >= 1)
