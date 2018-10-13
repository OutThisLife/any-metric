import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default (date: dayjs.ConfigType): string => {
  const d = dayjs(date)

  if (
    dayjs()
      .add(12, 'hour')
      .diff(d, 'day', true) < 1.4
  ) {
    return d.format('H:mm a')
  } else if (
    dayjs()
      .add(24, 'hour')
      .diff(d, 'day', true) < 2
  ) {
    return (d as any).fromNow()
  }

  return d.format()
}
