import { moneyFormat } from '@/lib/utils'
import { BaphoTheme } from '@/theme'
import * as d3 from 'd3'
import { rgba } from 'polished'
import { Chart } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  EdgeIndicator
} from 'react-stockcharts/lib/coordinates'
import { sma } from 'react-stockcharts/lib/indicator'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import {
  LineSeries,
  ScatterSeries,
  TriangleMarker
} from 'react-stockcharts/lib/series'
import { last } from 'react-stockcharts/lib/utils'
import {
  branch,
  compose,
  defaultProps,
  renderComponent,
  setDisplayName,
  withProps
} from 'recompose'
import { withTheme } from 'styled-components'

import { ChartCVProps, ChartState } from '..'
import ChartCanvas from '../style'
import Tooltip from '../Tooltip'

const MA = sma()
  .options({ windowSize: 4, sourcePath: 'price' })
  .merge((d, c) => ({ ...d, MA: c }))
  .accessor(d => d.MA)

export default compose<ChartState & BaphoTheme, ChartCVProps>(
  setDisplayName('chart-price'),
  defaultProps({
    isDesktop: true,
    ratio: 1
  }),
  withTheme,
  branch(({ data }) => !data.length, renderComponent(() => null)),
  withProps<Partial<ChartState>, ChartState>(
    ({ data: initialData, width, height }) => {
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
        top: 50,
        right: 60,
        bottom: 30,
        left: 50
      }

      const tickStyle: any = {
        fontSize: 12,
        gridWidth: width - margin.left - margin.right,
        gridHeight: height - margin.top - margin.bottom,
        tickStrokeDashArray: 'LongDashDotDot',
        tickStrokeOpacity: 0.05,
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
    isDesktop,
    tickStyle: { fontSize, gridWidth, gridHeight, ...tickStyle },
    ...props
  }) => (
    <ChartCanvas
      seriesName="Price"
      clamp={true}
      mouseMoveEvent={true}
      panEvent={true}
      {...props}>
      <Chart id={1} yExtents={[d => d.close, MA.accessor()]} yPan={false}>
        <ScatterSeries
          yAccessor={d => d.close}
          marker={TriangleMarker}
          markerProps={{
            width: 8,
            r: 2.5,
            fill: d =>
              /active/i.test(d.status)
                ? rgba(theme.colours.label, 0.25)
                : theme.colours.secondary,
            stroke: 'transparent'
          }}
        />
        <LineSeries
          yAccessor={d => d.close}
          stroke={rgba(theme.colours.secondary, 0.25)}
          strokeWidth={1}
          strokeDasharray="Dot"
        />
        <LineSeries
          yAccessor={MA.accessor()}
          stroke={theme.colours.secondary}
          strokeWidth={2}
          interpolation={d3.curveStep}
        />
        <XAxis
          axisAt="bottom"
          orient="bottom"
          fontSize={fontSize}
          stroke={theme.colours.border}
          tickStroke={theme.colours.label}
          innerTickSize={-1 * gridHeight}
          {...tickStyle}
        />
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
        <Tooltip fontSize={fontSize} />}
        <EdgeIndicator
          yAccessor={MA.accessor()}
          itemType="last"
          orient="right"
          edgeAt="right"
          fill={theme.colours.secondary}
        />
      </Chart>

      <CrossHairCursor
        snapX={false}
        StrokeDasharray="ShortDashDot"
        stroke={theme.colours.secondary}
      />
    </ChartCanvas>
  )
)
