import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const dateFormat = (date: dayjs.ConfigType): string => {
  const d = dayjs(date)

  if (isOld(d, 12, 1.4)) {
    return d.format('h:mm a')
  } else if (isOld(d)) {
    return (d as any).fromNow()
  } else if (d.year() === dayjs().year()) {
    return d.format('MMM DD')
  }

  return d.format('MMM DD, YY')
}

export const isOld = (date: dayjs.Dayjs | Date, h = 24, r = 2): boolean =>
  dayjs()
    .add(h, 'hour')
    .diff(date instanceof Date ? dayjs(date) : date, 'day', true) < r

export const unixDateFormat = (date: dayjs.ConfigType): string =>
  dayjs(date)
    .valueOf()
    .toString()

export const sortByDate = <T extends { date?: Date }>(a: T, b: T): number =>
  dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
