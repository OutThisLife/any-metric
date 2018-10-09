import { tsvParse } from 'd3-dsv'
import { timeParse } from 'd3-time-format'

const parseData = parse => d => ({
  ...d,
  date: parse(d.date),
  open: +d.open,
  high: +d.high,
  low: +d.low,
  close: +d.close,
  volume: +d.volume
})

const parseDate = timeParse('%Y-%m-%d')

export const getData = async () => {
  const data = await (await fetch('https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv')).text()
  return tsvParse(data, parseData(parseDate))
}
