import { Presets } from '@/components/charts/presets'
import { cloneDeep } from 'apollo-utilities'
import { format } from 'd3-format'
import { timeFormat, timeParse } from 'd3-time-format'
import dynamic from 'next/dynamic'
import { Chart, ChartCanvas } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY
} from 'react-stockcharts/lib/coordinates'
import { change } from 'react-stockcharts/lib/indicator'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import {
  BarSeries,
  CandlestickSeries,
  VolumeProfileSeries
} from 'react-stockcharts/lib/series'
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip'
import { last } from 'react-stockcharts/lib/utils'
import {
  branch,
  compose,
  onlyUpdateForKeys,
  renderComponent,
  setDisplayName
} from 'recompose'

interface TOutter {
  data?: any[]
  type?: keyof Presets
  width: number
  height: number
}

const presets: Presets = {
  Sentiment: dynamic(import('./presets/sentiment').then(m => m.default)),
  Volume: dynamic(import('./presets/volume').then(m => m.default))
}

export default compose<TOutter, TOutter>(
  setDisplayName('chart-generator'),
  onlyUpdateForKeys(['data', 'width']),
  branch(({ data = [] }) => !data.length, renderComponent(() => null))
)(({ type, data: initialData, width }) => {
  const Preset = presets[type]

  const parsed = cloneDeep(initialData).map(d =>
    Object.assign(d, {
      date: timeParse('%Y-%m-%d')(d.date)
    })
  )

  const calculatedData = change()(parsed)
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    d => d.date
  )
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
    calculatedData
  )

  const start = xAccessor(last(data))
  const end = xAccessor(data[Math.max(0, data.length - 150)])
  const xExtents = [start, end]

  return (
    <Preset>
      {render => (
        <aside>
          <ChartCanvas
            width={width * 0.75}
            height={width * 0.54}
            ratio={1}
            margin={{ top: 10, right: 80, bottom: 30, left: 80 }}
            type="hybrid"
            seriesName="MSFT"
            data={data}
            xScale={xScale}
            xAccessor={xAccessor}
            displayXAccessor={displayXAccessor}
            xExtents={xExtents}>
            <Chart
              id={2}
              yExtents={[d => d.volume]}
              height={150}
              origin={(_, h) => [0, h - 150]}>
              <YAxis
                axisAt="left"
                orient="left"
                ticks={5}
                tickFormat={format('.2s')}
              />
              <MouseCoordinateY
                at="left"
                orient="left"
                displayFormat={format('.4s')}
              />

              <BarSeries
                yAccessor={d => d.volume}
                widthRatio={0.95}
                opacity={0.3}
                fill={d => (d.close > d.open ? '#6BA583' : '#FF0000')}
              />
            </Chart>

            <Chart
              id={1}
              yExtents={[d => [d.high, d.low]]}
              padding={{ top: 40, bottom: 20 }}>
              <XAxis axisAt="bottom" orient="bottom" />
              <YAxis axisAt="right" orient="right" ticks={5} />

              <MouseCoordinateX
                at="bottom"
                orient="bottom"
                displayFormat={timeFormat('%Y-%m-%d')}
              />
              <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format('.2f')}
              />

              <VolumeProfileSeries />
              <CandlestickSeries />

              <EdgeIndicator
                itemType="last"
                orient="right"
                edgeAt="right"
                yAccessor={d => d.close}
                fill={d => (d.close > d.open ? '#6BA583' : '#FF0000')}
              />

              <OHLCTooltip origin={[-40, 0]} />
            </Chart>

            <CrossHairCursor />
          </ChartCanvas>
        </aside>
      )}
    </Preset>
  )
})
