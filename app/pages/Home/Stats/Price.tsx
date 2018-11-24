import { format } from 'd3-format'
import { Chart, ChartCanvas } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series'
import { last } from 'react-stockcharts/lib/utils'
import { compose, setDisplayName } from 'recompose'

export default compose<TOutter, TOutter>(
  setDisplayName('price'),
  fitWidth
)(({ data: initialData, width, ratio }) => {
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    d => d.date
  )
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
    initialData
  )

  const start = xAccessor(last(data))
  const end = xAccessor(data[Math.max(0, data.length - 100)])
  const xExtents = [start, end]

  return (
    <ChartCanvas
      height={400}
      ratio={ratio}
      width={width}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      type={type}
      seriesName="MSFT"
      data={data}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}>
      <Chart id={1} yExtents={d => [d.high, d.low]}>
        <XAxis axisAt="bottom" orient="bottom" />
        <YAxis axisAt="right" orient="right" ticks={5} />
        <CandlestickSeries />
      </Chart>

      <Chart
        id={2}
        origin={(w, h) => [0, h - 150]}
        height={150}
        yExtents={d => d.volume}>
        <YAxis
          axisAt="left"
          orient="left"
          ticks={5}
          tickFormat={format('.2s')}
        />

        <BarSeries
          yAccessor={d => d.volume}
          fill={d => (d.close > d.open ? '#6BA583' : 'red')}
        />
      </Chart>
    </ChartCanvas>
  )
})

interface TOutter {
  data: FakeCrawlResult[]
  [key: string]: any
}
