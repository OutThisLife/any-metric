import { moneyFormat, numFormat } from '@/lib/utils'
import { MockResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import * as d3 from 'd3'
import { rgba } from 'polished'
import { MeasuredComponentProps, withContentRect } from 'react-measure'
import { Chart } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from 'react-stockcharts/lib/coordinates'
import { sma } from 'react-stockcharts/lib/indicator'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import {
  AreaSeries,
  LineSeries,
  ScatterSeries,
  TriangleMarker
} from 'react-stockcharts/lib/series'
import { createVerticalLinearGradient, last } from 'react-stockcharts/lib/utils'
import { BoxProps } from 'rebass'
import {
  compose,
  setDisplayName,
  withProps,
  withPropsOnChange
} from 'recompose'
import { withTheme } from 'styled-components'

import Loader from './Loader'
import MetaData from './MetaData'
import ChartCanvas from './style'
import Tooltip from './Tooltip'

const MA = sma()
  .options({ windowSize: 10, sourcePath: 'price' })
  .merge((d, c) => ({ ...d, MA: c }))
  .accessor(d => d.MA)

export default compose<ChartState & BaphoTheme, ChartProps>(
  setDisplayName('price'),
  withContentRect('bounds'),
  withPropsOnChange(['contentRect'], () => ({
    isDesktop: 'browser' in process && window.innerWidth >= 1025
  })),
  withTheme,
  withProps<Partial<ChartState>, ChartProps>(({ data: initialData }) => {
    const calculatedData = MA(
      initialData.map(d => ({
        ...d,
        date: new Date(d.date),
        close: parseFloat(d.price),
        volume: initialData
          .filter(({ slug }) => slug === d.slug)
          .reduce((acc, { quantity }) => (acc += parseInt(quantity, 10)), 0)
      }))
    )

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      d => d.date
    )

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      calculatedData
    )

    const start = xAccessor(last(data))
    const end = xAccessor(data[Math.max(0, data.length - 150)])
    const xExtents = [start, end]

    return {
      data,
      xScale,
      displayXAccessor,
      xAccessor,
      xExtents
    }
  })
)(({ theme, measureRef, isDesktop, contentRect, ...props }) => (
  <div ref={measureRef} onMouseLeave={() => d3.timeout(unlink, 700)}>
    {!isNaN(contentRect.bounds.width) && (
      <ChartCanvas
        {...props}
        ratio={1}
        width={contentRect.bounds.width}
        height={contentRect.bounds.width * 0.7}
        seriesName="Price"
        clamp={true}
        type="hybrid"
        margin={{ top: 30, right: 0, bottom: 30, left: 30 }}>
        <Chart id={1} yExtents={[d => d.close, MA.accessor()]} yPan={false}>
          <MetaData />

          <XAxis
            axisAt="bottom"
            orient="bottom"
            fontSize={10}
            stroke={theme.colours.border}
            tickStroke={theme.colours.label}
          />

          {isDesktop && (
            <MouseCoordinateX
              fontSize={10}
              snapX={false}
              at="bottom"
              orient="bottom"
              fill={theme.colours.border}
              fillText={theme.colours.base}
              displayFormat={d => `Volume: ${numFormat(d)}`}
            />
          )}

          <YAxis
            axisAt="left"
            orient="left"
            fontSize={10}
            stroke={theme.colours.border}
            tickStroke={theme.colours.muted}
            displayFormat={moneyFormat}
          />

          {isDesktop && (
            <MouseCoordinateY
              fontSize={10}
              at="right"
              orient="left"
              fill={theme.colours.border}
              fillText={theme.colours.base}
              displayFormat={moneyFormat}
            />
          )}

          <ScatterSeries
            yAccessor={d => d.close}
            marker={TriangleMarker}
            markerProps={{
              width: 8,
              r: 2.5,
              fill: theme.colours.price.hl,
              stroke: 'transparent'
            }}
          />

          <LineSeries
            yAccessor={d => d.close}
            stroke={rgba(theme.colours.price.hl, 0.33)}
            strokeWidth={1}
            interpolation={d3.curveMonotoneX}
            strokeDasharray="Dot"
          />

          <LineSeries
            yAccessor={MA.accessor()}
            stroke={theme.colours.secondary}
            strokeWidth={2}
            interpolation={d3.curveMonotoneX}
          />

          {isDesktop && <Tooltip />}
        </Chart>

        <Chart
          id={2}
          height={75}
          yPan={false}
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
              <stop
                offset="0%"
                stopColor={theme.colours.border}
                stopOpacity={0}
              />

              <stop
                offset="50%"
                stopColor={theme.colours.border}
                stopOpacity={0.2}
              />

              <stop
                offset="100%"
                stopColor={theme.colours.border}
                stopOpacity={0.5}
              />
            </linearGradient>
          </defs>

          <AreaSeries
            yAccessor={d => d.volume}
            fill="url(#BarSeriesGradient)"
            stroke="transparent"
            strokeWidth={0}
            interpolation={d3.curveMonotoneX}
            canvasGradient={createVerticalLinearGradient([
              { stop: 0, color: rgba(theme.colours.border, 0) },
              { stop: 0.5, color: rgba(theme.colours.border, 0.2) },
              { stop: 1, color: rgba(theme.colours.border, 0.5) }
            ])}
          />
        </Chart>

        {isDesktop && (
          <CrossHairCursor
            snapX={false}
            StrokeDasharray="ShortDashDot"
            stroke={rgba(theme.colours.base, 0.1)}
          />
        )}
      </ChartCanvas>
    )}
  </div>
))

export const unlink = () => {
  const $cur = document.querySelector('.chart-link')

  if ($cur) {
    $cur.classList.remove('chart-link')
  }
}

export interface ChartProps extends BoxProps {
  data?: MockResult[]
  isDesktop?: boolean
}

export interface ChartState
  extends ChartProps,
    Partial<MeasuredComponentProps> {
  ratio: number
  data: any[]
  xScale: any[]
  displayXAccessor: any
  xAccessor: any
  xExtents: any
  initialData?: Array<{
    id: string | number
    date: Date
    price: number
    volume?: number
  }>
}

export { Loader }
