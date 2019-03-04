import { moneyFormat } from '@/lib/utils'
import { BaphoTheme } from '@/theme'
import * as d3 from 'd3'
import { rgba } from 'polished'
import { func } from 'prop-types'
import { Chart, ChartCanvas, ZoomButtons } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  EdgeIndicator
} from 'react-stockcharts/lib/coordinates'
import { ClickCallback } from 'react-stockcharts/lib/interactive'
import {
  CircleMarker,
  LineSeries,
  ScatterSeries
} from 'react-stockcharts/lib/series'
import { HoverTooltip } from 'react-stockcharts/lib/tooltip'
import { compose, getContext, setDisplayName, withState } from 'recompose'
import { withTheme } from 'styled-components'

import { ChartState } from '.'

export default compose<ChartState & PriceChartProps, ChartState>(
  setDisplayName('chart-price'),
  withTheme,
  getContext({ scrollToIndex: func }),
  withState('suffix', 'handleReset', Math.random())
)(
  ({
    theme,
    handleReset,
    suffix,
    ema,
    tickStyle: { gridWidth, gridHeight, ...tickStyle },
    scrollToIndex,
    ...props
  }) => {
    const r = d =>
      d3
        .scaleLinear()
        .range([2, 10])
        .domain(d3.extent(props.data, (z: any) => z.close))(d.close)

    return (
      <ChartCanvas seriesName={`Price_${suffix}`} {...props}>
        <Chart id={1} yExtents={d => d.close} yPan={false}>
          <ScatterSeries
            yAccessor={d => d.close}
            marker={CircleMarker}
            markerProps={{
              r,
              stroke: theme.bg,
              fill: rgba(theme.brand, 0.1)
            }}
          />
          <XAxis
            axisAt="bottom"
            orient="bottom"
            innerTickSize={-1 * gridHeight}
            {...tickStyle}
          />
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            innerTickSize={-1 * gridWidth}
            {...tickStyle}
          />

          {window.innerWidth >= 1025 && (
            <ClickCallback
              onDoubleClick={handleReset}
              onMouseMove={({ currentItem }) => {
                localStorage.setItem('url', currentItem.url)

                if (!document.body.classList.contains('lock-chart')) {
                  window.requestAnimationFrame(() =>
                    scrollToIndex(currentItem._id)
                  )
                }
              }}
            />
          )}

          <HoverTooltip
            fontSize={tickStyle.fontSize}
            bgOpacity={0}
            fill="transparent"
            stroke="transparent"
            snapX={true}
            tooltipContent={({ currentItem }) => {
              const x = currentItem.title
              const y = [
                {
                  label: 'Price',
                  value: moneyFormat(currentItem.close)
                }
              ]

              return { x, y }
            }}
          />

          <ZoomButtons onReset={handleReset} />
        </Chart>

        <Chart id={2} yExtents={ema.accessor()} yPan={false}>
          <LineSeries
            yAccessor={ema.accessor()}
            stroke={theme.brand}
            strokeWidth={2}
            interpolation={d3.curveStep}
          />

          <EdgeIndicator
            yAccessor={ema.accessor()}
            itemType="last"
            orient="right"
            edgeAt="right"
            fill={theme.brand}
          />
        </Chart>

        <CrossHairCursor
          StrokeDasharray="ShortDashDot"
          stroke={theme.base}
          snapX={true}
        />
      </ChartCanvas>
    )
  }
)

export interface PriceChartProps extends BaphoTheme {
  suffix: number
  handleReset: () => void
  scrollToIndex?: (a: string) => void
}
