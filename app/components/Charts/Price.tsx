import { BoxProps } from '@/components/Box'
import { moneyFormat, numFormat } from '@/lib/utils'
import { FakeResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import * as d3 from 'd3'
import faker from 'faker'
import { rgba } from 'polished'
import { Chart, ChartCanvas } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from 'react-stockcharts/lib/coordinates'
import { fitDimensions } from 'react-stockcharts/lib/helper'
import { sma } from 'react-stockcharts/lib/indicator'
import { ClickCallback } from 'react-stockcharts/lib/interactive'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import {
  AreaSeries,
  LineSeries,
  ScatterSeries,
  TriangleMarker
} from 'react-stockcharts/lib/series'
import { HoverTooltip } from 'react-stockcharts/lib/tooltip'
import {
  createVerticalLinearGradient,
  hexToRGBA,
  last
} from 'react-stockcharts/lib/utils'
import {
  compose,
  mapProps,
  setDisplayName,
  withPropsOnChange,
  withState
} from 'recompose'
import { withTheme } from 'styled-components'

const MA = sma()
  .options({ windowSize: 10, sourcePath: 'price' })
  .merge((d, c) => ({ ...d, MA: c }))
  .accessor(d => d.MA)

export default compose<ChartProps & BaphoTheme, ChartOutterProps>(
  mapProps<ChartProps, ChartOutterProps>(({ data }) => ({
    initialData: data.map(d => ({
      ...d,
      date: new Date(d.date),
      price: parseFloat(d.price),
      volume: faker.random.number({ min: 10, max: 1000 })
    }))
  })),
  withTheme,
  fitDimensions,
  withState('chartProps', 'updateChart', ({ initialData }) => {
    const calculatedData = MA(initialData)

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
  }),
  withPropsOnChange(['width'], ({ chartProps, width, height }) => ({
    chartProps: {
      ...chartProps,
      width,
      height,
      ratio: width / height,
      isTablet: width < 1025
    }
  })),
  setDisplayName('price')
)(({ theme, chartProps = {}, isTablet }) => (
  <div onMouseLeave={() => d3.timeout(unlink, 700)}>
    <ChartCanvas
      {...chartProps}
      seriesName="Price"
      clamp={true}
      type="hybrid"
      pointsPerPxThreshold={6}
      margin={{ top: 0, right: 50, bottom: 50, left: 0 }}>
      <Chart id={2} yExtents={[d => d.price, MA.accessor()]} yPan={false}>
        <XAxis
          axisAt="bottom"
          orient="bottom"
          fontSize={10}
          fontFamily="monospace"
          stroke={theme.colours.border}
          tickStroke={theme.colours.muted}
        />
        {isTablet && (
          <MouseCoordinateX
            fontSize={11}
            snapX={false}
            at="bottom"
            orient="bottom"
            fontFamily="monospace"
            fill={theme.colours.border}
            fillText={theme.colours.base}
            displayFormat={d => `Volume: ${numFormat(d)}`}
          />
        )}

        <YAxis
          axisAt="right"
          orient="right"
          fontSize={10}
          fontFamily="monospace"
          stroke={theme.colours.border}
          tickStroke={theme.colours.base}
          displayFormat={moneyFormat}
        />
        {isTablet && (
          <MouseCoordinateY
            fontSize={11}
            at="right"
            orient="right"
            fontFamily="monospace"
            fill={theme.colours.border}
            fillText={theme.colours.base}
            displayFormat={moneyFormat}
          />
        )}

        <ScatterSeries
          yAccessor={d => d.price}
          marker={TriangleMarker}
          markerProps={{
            width: 8,
            r: 2.5,
            fill: theme.colours.star,
            stroke: 'transparent'
          }}
        />

        <LineSeries
          yAccessor={d => d.price}
          stroke={hexToRGBA(theme.colours.star, 0.33)}
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

        {isTablet && (
          <HoverTooltip
            yAccessor={d => d.price}
            fontSize={11}
            bgOpacity={0}
            fontFill={theme.colours.base}
            fontFamily={theme.fonts.family.title}
            fill="transparent"
            stroke="transparent"
            tooltipContent={({ currentItem }: { currentItem: FakeResult }) =>
              currentItem.price && {
                x: currentItem.title,
                y: [
                  {
                    label: 'Price',
                    value: moneyFormat(parseFloat(currentItem.price))
                  },
                  {
                    label: 'Qty',
                    value: numFormat(parseInt(currentItem.quantity, 10))
                  }
                ]
              }
            }
          />
        )}

        {isTablet && (
          <ClickCallback
            onMouseMove={({ currentItem }) => {
              unlink()

              const $row = document.getElementById(currentItem.id)

              if ($row) {
                const $table = document.querySelector(
                  '[data-evergreen-table-body]'
                ).firstChild as HTMLElement

                $row.classList.add('chart-link')

                d3.transition()
                  .duration(90)
                  .ease(d3.easeCubic)
                  .tween('scrollTop', () => {
                    const i = d3.interpolateNumber(
                      $table.scrollTop,
                      $row.offsetTop
                    )

                    return t => ($table.scrollTop = i(t))
                  })
              }
            }}
          />
        )}
      </Chart>

      <Chart
        id={1}
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
            { stop: 0, color: hexToRGBA(theme.colours.border, 0) },
            { stop: 0.5, color: hexToRGBA(theme.colours.border, 0.2) },
            { stop: 1, color: hexToRGBA(theme.colours.border, 0.5) }
          ])}
        />
      </Chart>

      {isTablet && (
        <CrossHairCursor
          snapX={false}
          StrokeDasharray="ShortDashDot"
          stroke={rgba(theme.colours.base, 0.1)}
        />
      )}
    </ChartCanvas>
  </div>
))

const unlink = () => {
  const $cur = document.querySelector('.chart-link')

  if ($cur) {
    $cur.classList.remove('chart-link')
  }
}

interface ChartOutterProps extends BoxProps<HTMLDivElement> {
  data?: FakeResult[]
}

interface ChartProps extends ChartOutterProps {
  chartProps?: any
  initialData?: Array<{
    id: string | number
    date: Date
    price: number
    volume: number
  }>
}
