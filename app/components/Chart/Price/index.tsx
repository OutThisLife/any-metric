import { moneyFormat, numFormat } from '@/lib/utils'
import { BaphoTheme } from '@/theme'
import * as d3 from 'd3'
import { rgba } from 'polished'
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
import { compose, defaultProps, setDisplayName, withProps } from 'recompose'
import { withTheme } from 'styled-components'

import { ChartCVProps, ChartState } from '..'
import MetaData from '../MetaData'
import ChartCanvas from '../style'
import Tooltip from '../Tooltip'

const MA = sma()
  .options({ windowSize: 10, sourcePath: 'price' })
  .merge((d, c) => ({ ...d, MA: c }))
  .accessor(d => d.MA)

export default compose<ChartState & BaphoTheme, ChartCVProps>(
  setDisplayName('chart-price'),
  defaultProps({
    isModal: false,
    isDesktop: true,
    ratio: 1
  }),
  withTheme,
  withProps<Partial<ChartState>, ChartState>(
    ({ data: initialData, width, height, isModal }) => {
      const calculatedData = MA(
        initialData.map(d => ({
          ...d,
          date: new Date(d.createdAt),
          close: d.price,
          volume: initialData
            .filter(({ slug }) => slug === d.slug)
            .reduce((acc, { qty }) => (acc += qty), 0)
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

      const margin = { top: 30, right: 0, bottom: 30, left: 30 }

      const tickStyle = {
        fontSize: isModal ? 14 : 10,
        ticks: isModal ? Math.max(width, height) / 150 : 5,
        gridWidth: width - margin.left - margin.right,
        gridHeight: height - margin.top - margin.bottom,
        tickStrokeDashArray: 'Solid',
        tickStrokeOpacity: isModal ? 0.2 : 0,
        tickStrokeWidth: 1
      }

      return {
        data,
        xScale,
        displayXAccessor,
        xAccessor,
        xExtents,
        margin,
        tickStyle
      }
    }
  )
)(
  ({
    theme,
    isModal,
    isDesktop,
    tickStyle: { fontSize, gridWidth, gridHeight, ...tickStyle },
    ...props
  }) => (
    <ChartCanvas seriesName="Price" clamp={true} type="hybrid" {...props}>
      <Chart id={1} yExtents={[d => d.close, MA.accessor()]} yPan={false}>
        <MetaData />

        <XAxis
          axisAt="bottom"
          orient="bottom"
          fontSize={fontSize}
          stroke={theme.colours.border}
          tickStroke={theme.colours.label}
          innerTickSize={-1 * gridHeight}
          {...tickStyle}
        />

        {isDesktop && (
          <MouseCoordinateX
            fontSize={fontSize}
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
          fontSize={fontSize}
          stroke={theme.colours.border}
          tickStroke={theme.colours.muted}
          displayFormat={moneyFormat}
          innerTickSize={-1 * gridWidth}
          {...tickStyle}
        />

        {isDesktop && (
          <MouseCoordinateY
            fontSize={fontSize}
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

        {isDesktop && <Tooltip fontSize={fontSize} />}
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
  )
)
