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

import { ChartState } from '..'
import ChartCanvas from '../style'

export default compose<ChartState & PriceChartProps, ChartState>(
  setDisplayName('chart-price'),
  withStateHandlers(
    { suffix: Math.random() },
    {
      handleReset: () => () => ({ suffix: Math.random() })
    }
  )
)(
  ({
    handleReset,
    suffix,
    ema,
    tickStyle: { gridWidth, gridHeight, ...tickStyle },
    ...props
  }) => {
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
              stroke: '#BDC3C7',
              fill: '#ECF0F1'
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
          <ClickCallback
            onDoubleClick={handleReset}
            onMouseMove={({ currentItem }) => {
              const el = document.getElementById(`t-${currentItem._id}`)

              if (el instanceof HTMLElement) {
                const $parent = el.parentElement

                const $current = $parent.querySelector('.active')

                if ($current) {
                  $current.classList.remove('active')
                }

                window.requestAnimationFrame(() => {
                  el.scrollIntoView(true)
                  el.classList.add('active')
                })
              }
            }}
          />
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
            stroke="#0000ee"
            strokeWidth={2}
            interpolation={d3.curveNatural}
          />

          <EdgeIndicator
            yAccessor={ema.accessor()}
            itemType="last"
            orient="right"
            edgeAt="right"
            fill="#0000ee"
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
