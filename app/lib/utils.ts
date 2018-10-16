import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const flatten = <T extends Array<{ [key: string]: any }>, K = string>(
  arr: T,
  key: string
): K[] =>
  arr
    .reduce(
      (acc: K[], r) =>
        (r[key] instanceof Array ? acc.push(...r[key]) : acc.push(r[key])) &&
        acc,
      []
    )
    .filter((r: K, i, self: K[]) => r && self.indexOf(r) === i)

export const dateFormat = (date: dayjs.ConfigType): string => {
  const d = dayjs(date)

  if (
    dayjs()
      .add(12, 'hour')
      .diff(d, 'day', true) < 1.4
  ) {
    return d.format('h:mm a')
  } else if (
    dayjs()
      .add(24, 'hour')
      .diff(d, 'day', true) < 2
  ) {
    return (d as any).fromNow()
  } else if (d.year() === dayjs().year()) {
    return d.format('MMM DD')
  }

  return d.format('MMM DD, YY')
}

export const unixDateFormat = (date: dayjs.ConfigType): string =>
  dayjs(date)
    .valueOf()
    .toString()

export const sortByDate = <T extends { date: Date }>(a: T, b: T): number =>
  dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
