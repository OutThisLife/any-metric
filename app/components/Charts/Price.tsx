import withDimensions from '@/lib/withDimensions'
import { FakeCrawlResult } from '@/server/schema/types'
import * as d3 from 'd3'
import faker from 'faker'
import sortedUniqBy from 'lodash/sortedUniqBy'
import { rgba } from 'polished'
import { Chart, ChartCanvas } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY
} from 'react-stockcharts/lib/coordinates'
import { ema } from 'react-stockcharts/lib/indicator'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import {
  AreaSeries,
  LineSeries,
  ScatterSeries,
  TriangleMarker
} from 'react-stockcharts/lib/series'
import {
  createVerticalLinearGradient,
  hexToRGBA,
  last
} from 'react-stockcharts/lib/utils'
import { compose, mapProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

export default compose<TInner, TOutter>(
  mapProps<TInner, TOutter>(({ data }) => ({
    initialData: sortedUniqBy(data, 'date').map(d => ({
      id: d.id,
      date: new Date(d.date),
      price: parseFloat(d.price),
      volume: faker.random.number({ min: 10, max: 1000 })
    }))
  })),
  withTheme,
  withDimensions,
  setDisplayName('price')
)(({ onRef, theme, initialData, width }) => {
  const avg = ema()
    .options({ sourcePath: 'price' })
    .merge((d, ema50) => ({ ...d, ema50 }))
    .accessor(d => d.ema50)

  const {
    data,
    xScale,
    xAccessor,
    displayXAccessor
  } = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date)(
    avg(initialData)
  )

  const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - 75])]

  const canvasGradient = createVerticalLinearGradient([
    { stop: 0, color: hexToRGBA('#425087', 0) },
    { stop: 0.5, color: hexToRGBA('#425087', 0.2) },
    { stop: 1, color: hexToRGBA('#425087', 0.5) }
  ])

  return (
    <ChartCanvas
      ref={onRef}
      data={data}
      seriesName="Price"
      width={width}
      height={width * 0.54}
      clamp={true}
      ratio={1}
      margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
      displayXAccessor={displayXAccessor}>
      <Chart
        id={1}
        height={75}
        yAccessor={d => d.volume()}
        yExtents={d => d.volume}
        origin={(_, h) => [0, h - 75]}>
        <defs>
          <linearGradient
            id="BarSeriesGradient"
            x1="0"
            y1="100%"
            x2="0"
            y2="0%">
            <stop offset="0%" stopColor="#425087" stopOpacity={0} />
            <stop offset="50%" stopColor="#425087" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#425087" stopOpacity={0.5} />
          </linearGradient>
        </defs>

        <AreaSeries
          yAccessor={d => d.volume}
          fill="url(#BarSeriesGradient)"
          stroke="transparent"
          strokeWidth={0}
          interpolation={d3.curveMonotoneX}
          canvasGradient={canvasGradient}
        />
      </Chart>

      <Chart
        id={2}
        yExtents={[d => d.price, avg.accessor()]}
        padding={{ top: 10, bottom: 20 }}>
        <ScatterSeries
          yAccessor={d => d.price}
          marker={TriangleMarker}
          markerProps={{
            width: 6,
            fill: theme.colours.tertiary,
            stroke: 'transparent'
          }}
        />
        <LineSeries
          yAccessor={avg.accessor()}
          stroke={theme.colours.secondary}
          strokeWidth={2}
        />

        <XAxis
          fontSize={9}
          stroke={theme.colours.border}
          tickStroke="#8B96B5"
          axisAt="bottom"
          orient="bottom"
        />
        <MouseCoordinateX
          fontSize={11}
          snapX={false}
          at="bottom"
          orient="bottom"
          fill={theme.colours.border}
          fillText={theme.colours.base}
          displayFormat={d => `Volume: ${d3.format('.2f')(d)}`}
        />

        <YAxis
          fontSize={9}
          stroke={theme.colours.border}
          tickStroke={theme.colours.base}
          axisAt="right"
          orient="right"
          displayFormat={d3.format('$.2f')}
        />
        <MouseCoordinateY
          fontSize={11}
          axisAt="left"
          orient="left"
          fill={theme.colours.border}
          fillText={theme.colours.base}
          displayFormat={d3.format('$.2f')}
        />

        <EdgeIndicator
          type="horizontal"
          itemType="last"
          orient="right"
          edgeAt="right"
          yAccessor={avg.accessor()}
          fill={theme.colours.secondary}
          fillText={theme.colours.base}
          displayFormat={d3.format('$.2f')}
        />
      </Chart>

      <CrossHairCursor
        snapX={false}
        StrokeDasharray="ShortDashDot"
        stroke={rgba(theme.colours.base, 0.1)}
      />
    </ChartCanvas>
  )
})

interface TOutter extends React.CSSProperties {
  data: FakeCrawlResult[]
}

interface TInner {
  initialData?: Array<{
    id: string | number
    date: Date
    price: number
    volume: number
  }>
  [key: string]: any
}
