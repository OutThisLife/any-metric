import { moneyFormat } from '@/lib/utils'
import * as d3 from 'd3'
import { Chart, ZoomButtons } from 'react-stockcharts'
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
import { compose, setDisplayName, withStateHandlers } from 'recompose'
import { ThemeProps, withTheme } from 'styled-components'

import { ChartState } from '..'
import ChartCanvas from '../style'

export default compose<
  ChartState & PriceChartProps & ThemeProps<any>,
  ChartState
>(
  setDisplayName('chart-price'),
  withTheme,
  withStateHandlers(
    { suffix: Math.random() },
    {
      handleReset: () => () => ({ suffix: Math.random() })
    }
  )
)(
  ({
    theme,
    handleReset,
    suffix,
    ema,
    tickStyle: { gridWidth, gridHeight, ...tickStyle },
    ...props
  }) => {
    let tm

    const r = d =>
      d3
        .scaleLinear()
        .range([2, 20])
        .domain(d3.extent(props.data, (z: any) => z.close))(d.close)

    return (
      <ChartCanvas seriesName={`Price_${suffix}`} {...props}>
        <Chart id={1} yExtents={d => d.close}>
          <ScatterSeries
            yAccessor={d => d.close}
            marker={CircleMarker}
            markerProps={{
              r,
              stroke: theme.bg,
              fill: theme.border
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
                clearTimeout(tm)

                const el = document.getElementById(`t-${currentItem._id}`)
                const $zoom = document.getElementById('zoom')

                if (el instanceof HTMLElement) {
                  const $parent = el.parentElement
                  const $current = $parent.querySelector('[id].active')

                  if ($current) {
                    $current.classList.remove('active')
                  }

                  window.requestAnimationFrame(() => {
                    el.classList.add('active')
                    $zoom.setAttribute('src', currentItem.image)

                    $parent.parentElement.scrollTop = el.offsetTop
                  })

                  tm = setTimeout(() => {
                    el.classList.remove('active')
                    $zoom.removeAttribute('src')
                  }, 3500)
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
          stroke="#000"
          snapX={true}
        />
      </ChartCanvas>
    )
  }
)

export interface PriceChartProps {
  suffix: number
  handleReset: () => void
}
