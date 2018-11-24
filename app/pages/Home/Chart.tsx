import { sortByDate } from '@/lib/utils'
import withDimensions from '@/lib/withDimensions'
import { FakeCrawlResult } from '@/server/schema/types'
import { format } from 'd3'
import { Pane } from 'evergreen-ui'
import faker from 'faker'
import { lighten } from 'polished'
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
  BarSeries,
  LineSeries,
  ScatterSeries,
  TriangleMarker
} from 'react-stockcharts/lib/series'
import { last } from 'react-stockcharts/lib/utils'
import { compose, mapProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

export default compose<TInner, TOutter>(
  setDisplayName('price'),
  mapProps<TInner, TOutter>(({ data }) => ({
    initialData: data.sort(sortByDate).map(d => ({
      id: d.id,
      date: new Date(d.date),
      price: parseFloat(d.price),
      volume: faker.random.number({ min: 10, max: 1000 })
    }))
  })),
  withTheme,
  withDimensions(true)
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

  const grid = {
    stroke: theme.colours.base,
    tickStroke: theme.colours.border,
    innerTickSize: -1 * width - 80 - 80,
    tickStrokeDashArray: 'Solid',
    tickStrokeOpacity: 0.2,
    tickStrokeWidth: 1
  }

  return (
    <Pane ref={onRef}>
      <ChartCanvas
        data={data}
        seriesName="Price"
        width={width / 2}
        height={width / 4}
        clamp={true}
        ratio={1}
        margin={{ left: 80, right: 80, top: 30, bottom: 50 }}
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        displayXAccessor={displayXAccessor}>
        <Chart
          id={1}
          height={75}
          yAccessor={avg.accessor()}
          yExtents={d => d.volume}
          origin={(_, h) => [0, h - 75]}>
          <BarSeries
            yAccessor={d => d.volume}
            fill={lighten(0.5, theme.colours.secondary)}
            stroke="transparent"
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
              fill: theme.colours.secondary,
              stroke: 'transparent'
            }}
          />
          <LineSeries
            yAccessor={avg.accessor()}
            stroke={theme.colours.base}
            strokeWidth={2}
          />

          <XAxis axisAt="bottom" orient="bottom" {...grid} />
          <MouseCoordinateX
            snapX={false}
            at="bottom"
            orient="bottom"
            displayFormat={format('.2f')}
          />

          <YAxis
            axisAt="right"
            orient="right"
            displayFormat={format('$.2s')}
            {...grid}
          />
          <MouseCoordinateY
            axisAt="left"
            orient="left"
            displayFormat={format('$.2s')}
          />

          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={avg.accessor()}
            fill={theme.colours.base}
            displayFormat={format('$.2s')}
          />
        </Chart>

        <CrossHairCursor snapX={false} StrokeDasharray="ShortDashDot" />
      </ChartCanvas>
    </Pane>
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
