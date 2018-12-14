import { moneyFormat, numFormat } from '@/lib/utils'
import { BaphoTheme } from '@/theme'
import * as d3 from 'd3'
import { rgba } from 'polished'
import { Chart } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY
} from 'react-stockcharts/lib/coordinates'
import { sma } from 'react-stockcharts/lib/indicator'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import {
  LineSeries,
  ScatterSeries,
  TriangleMarker
} from 'react-stockcharts/lib/series'
import { last } from 'react-stockcharts/lib/utils'
import { compose, defaultProps, setDisplayName, withProps } from 'recompose'
import { withTheme } from 'styled-components'

import { ChartCVProps, ChartState } from '..'
import MetaData from '../MetaData'
import ChartCanvas from '../style'
import Tooltip from '../Tooltip'

const MA = sma()
  .options({ windowSize: 4, sourcePath: 'price' })
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

      const margin = {
        top: isModal ? 50 : 30,
        right: isModal ? 60 : 30,
        bottom: 30,
        left: isModal ? 50 : 30
      }

      const tickStyle: any = {
        fontSize: isModal ? 12 : 10,
        gridWidth: width - margin.left - margin.right,
        gridHeight: height - margin.top - margin.bottom,
        tickStrokeDashArray: 'LongDashDotDot',
        tickStrokeOpacity: 0.2,
        tickStrokeWidth: 1
      }

      if (!isModal) {
        tickStyle.ticks = 3
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
    <ChartCanvas
      seriesName="Price"
      clamp={true}
      mouseMoveEvent={isModal}
      panEvent={isModal}
      {...props}>
      <Chart id={1} yExtents={[d => d.close, MA.accessor()]} yPan={false}>
        {isModal && <MetaData />}

        {isModal && (
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
        )}

        <LineSeries
          yAccessor={d => d.close}
          stroke={rgba(theme.colours.price.hl, 0.33)}
          strokeWidth={1}
          strokeDasharray="Dot"
        />

        <LineSeries
          yAccessor={MA.accessor()}
          stroke={theme.colours.secondary}
          strokeWidth={isModal ? 2 : 1}
          interpolation={d3.curveStep}
        />

        {isModal && (
          <XAxis
            axisAt="bottom"
            orient="bottom"
            fontSize={fontSize}
            stroke={theme.colours.border}
            tickStroke={theme.colours.label}
            innerTickSize={-1 * gridHeight}
            {...tickStyle}
          />
        )}

        {isModal && (
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

        {isModal && (
          <MouseCoordinateY
            fontSize={fontSize}
            at="right"
            orient="right"
            fill={theme.colours.border}
            fillText={theme.colours.base}
            displayFormat={moneyFormat}
          />
        )}

        {isModal && <Tooltip fontSize={fontSize} />}
        {isModal && (
          <EdgeIndicator
            yAccessor={MA.accessor()}
            itemType="last"
            orient="right"
            edgeAt="right"
            fill={theme.colours.secondary}
          />
        )}
      </Chart>

      {isModal && (
        <CrossHairCursor
          snapX={false}
          StrokeDasharray="ShortDashDot"
          stroke={rgba(theme.colours.base, 0.1)}
        />
      )}
    </ChartCanvas>
  )
)
