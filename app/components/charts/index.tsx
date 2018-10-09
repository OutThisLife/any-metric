import { Presets } from '@/components/charts/presets'
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import { Chart, ChartCanvas } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import { CrossHairCursor, EdgeIndicator, MouseCoordinateX, MouseCoordinateY } from 'react-stockcharts/lib/coordinates'
import { change } from 'react-stockcharts/lib/indicator'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { BarSeries, CandlestickSeries, VolumeProfileSeries } from 'react-stockcharts/lib/series'
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip'
import { last } from 'react-stockcharts/lib/utils'
import { branch, compose, onlyUpdateForKeys, renderComponent, setDisplayName, withProps } from 'recompose'

import { getData } from './utils'

interface TOutter {
  initialData?: any[]
  type?: keyof Presets
}

const presets: Presets = {
  Sentiment: dynamic(import('./presets/sentiment').then(m => m.default)),
  Volume: dynamic(import('./presets/volume').then(m => m.default))
}

export default compose<TOutter, TOutter>(
  setDisplayName('chart-generator'),
  onlyUpdateForKeys(['data']),
  withProps(async props => ({
    ...props,
    initialData: await getData()
  })),
  branch(
    ({ initialData = [] }) => !initialData.length,
    renderComponent(() => null)
  )
)(({ type, initialData, ...props }) => {
  const Preset = presets[type]
  const changeCalculator = change()

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date)
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(changeCalculator(initialData))

  const start = xAccessor(last(data))
  const end = xAccessor(data[Math.max(0, data.length - 150)])
  const xExtents = [start, end]

  return (
    <Preset>
      {render => (
        <aside>
          <ChartCanvas
            height={400}
            width={400}
            ratio={1}
            margin={{ left: 80, right: 80, top: 10, bottom: 30 }}
            type="hybrid"
            seriesName="MSFT"
            data={data}
            xScale={xScale}
            xAccessor={xAccessor}
            displayXAccessor={displayXAccessor}
            xExtents={xExtents}>
            <Chart id={2} yExtents={[d => d.volume]} height={150} origin={(w, h) => [0, h - 150]}>
              <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format('.2s')} />
              <MouseCoordinateY at="left" orient="left" displayFormat={format('.4s')} />
              <BarSeries
                yAccessor={d => d.volume}
                widthRatio={0.95}
                opacity={0.3}
                fill={d => (d.close > d.open ? '#6BA583' : '#FF0000')}
              />
            </Chart>

            <Chart id={1} yExtents={[d => [d.high, d.low]]} padding={{ top: 40, bottom: 20 }}>
              <XAxis axisAt="bottom" orient="bottom" />
              <YAxis axisAt="right" orient="right" ticks={5} />

              <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat('%Y-%m-%d')} />
              <MouseCoordinateY at="right" orient="right" displayFormat={format('.2f')} />

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
