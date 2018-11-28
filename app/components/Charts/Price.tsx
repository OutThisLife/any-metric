import { BoxProps } from '@/components/Box'
import { moneyFormat, numFormat } from '@/lib/utils'
import withDimensions from '@/lib/withDimensions'
import { FakeResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import * as d3 from 'd3'
import faker from 'faker'
import sortedUniqBy from 'lodash/sortedUniqBy'
import { rgba } from 'polished'
import { Chart, ChartCanvas } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY
} from 'react-stockcharts/lib/coordinates'
import { ema } from 'react-stockcharts/lib/indicator'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import {
  AreaSeries,
  CircleMarker,
  LineSeries,
  ScatterSeries
} from 'react-stockcharts/lib/series'
import { HoverTooltip } from 'react-stockcharts/lib/tooltip'
import {
  createVerticalLinearGradient,
  hexToRGBA,
  last
} from 'react-stockcharts/lib/utils'
import {
  branch,
  compose,
  mapProps,
  onlyUpdateForKeys,
  renderComponent,
  setDisplayName
} from 'recompose'
import { withTheme } from 'styled-components'

export default compose<ChartProps & BaphoTheme, ChartOutterProps>(
  branch(() => !('browser' in process), renderComponent(() => null)),
  mapProps<ChartProps, ChartOutterProps>(({ data }) => ({
    initialData: sortedUniqBy(data, 'date').map(d => ({
      ...d,
      date: new Date(d.date),
      price: parseFloat(d.price),
      volume: faker.random.number({ min: 10, max: 1000 })
    }))
  })),
  withTheme,
  withDimensions,
  onlyUpdateForKeys(['width']),
  setDisplayName('price')
)(({ onRef, theme, initialData, width }) => {
  const avg = ema()
    .options({ sourcePath: 'price' })
    .merge((d, ema50) => ({ ...d, ema50 }))
    .accessor(d => d.ema50)

  const {
    data,
    xScale,
    xAccessor,
    displayXAccessor
  } = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date)(
    avg(initialData)
  )

  const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - 75])]

  const canvasGradient = createVerticalLinearGradient([
    { stop: 0, color: hexToRGBA(theme.colours.border, 0) },
    { stop: 0.5, color: hexToRGBA(theme.colours.border, 0.2) },
    { stop: 1, color: hexToRGBA(theme.colours.border, 0.5) }
  ])

  const w = window.innerWidth

  return (
    <ChartCanvas
      ref={onRef}
      data={data}
      seriesName="Price"
      width={width}
      height={parseInt(width.toString(), 10) * 0.54}
      clamp={true}
      ratio={1}
      margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
      displayXAccessor={displayXAccessor}>
      <Chart
        id={1}
        height={75}
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
          canvasGradient={canvasGradient}
        />
      </Chart>

      <Chart
        id={2}
        yExtents={[d => d.price, avg.accessor()]}
        padding={{ top: 10, bottom: 20 }}>
        <ScatterSeries
          yAccessor={d => d.price}
          marker={CircleMarker}
          markerProps={{
            width: 6,
            r: 2.5,
            fill: theme.colours.star,
            stroke: 'transparent'
          }}
        />

        {w >= 1025 && (
          <HoverTooltip
            yAccessor={d => d.price}
            fontSize={12}
            bgOpacity={1}
            fontFill={theme.colours.base}
            fontFamily={theme.fonts.family.title}
            fill={hexToRGBA('#000000', 0)}
            stroke="transparent"
            bgFill={hexToRGBA(theme.colours.secondary, 0.1)}
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

        <LineSeries
          yAccessor={avg.accessor()}
          stroke={theme.colours.secondary}
          strokeWidth={2}
        />

        <XAxis
          ticks={w >= 1025 ? 12 : 4}
          fontSize={9}
          fontFamily={theme.fonts.family.title}
          stroke={theme.colours.border}
          tickStroke={hexToRGBA(theme.colours.base, 0.5)}
          axisAt="bottom"
          orient="bottom"
        />
        {w >= 1025 && (
          <MouseCoordinateX
            fontSize={11}
            snapX={false}
            at="bottom"
            orient="bottom"
            fill={theme.colours.border}
            fillText={theme.colours.base}
            displayFormat={d => `Volume: ${numFormat(d)}`}
          />
        )}

        <YAxis
          ticks={w >= 1025 ? 12 : 4}
          fontSize={9}
          fontFamily={theme.fonts.family.title}
          stroke={theme.colours.border}
          tickStroke={theme.colours.base}
          axisAt="right"
          orient="right"
          displayFormat={moneyFormat}
        />
        {w >= 1025 && (
          <MouseCoordinateY
            fontSize={11}
            axisAt="left"
            orient="left"
            fill={theme.colours.border}
            fillText={theme.colours.base}
            displayFormat={moneyFormat}
          />
        )}

        <EdgeIndicator
          yAccessor={d => d.price}
          itemType="last"
          orient="right"
          edgeAt="right"
          fontFamily={theme.fonts.family.title}
          fill={theme.colours.secondary}
          textFill={theme.colours.base}
          displayFormat={moneyFormat}
        />
      </Chart>

      {w >= 1025 && (
        <CrossHairCursor
          snapX={false}
          StrokeDasharray="ShortDashDot"
          stroke={rgba(theme.colours.base, 0.1)}
        />
      )}
    </ChartCanvas>
  )
})

interface ChartOutterProps extends BoxProps<HTMLDivElement> {
  data?: FakeResult[]
}

interface ChartProps extends ChartOutterProps {
  initialData?: Array<{
    id: string | number
    date: Date
    price: number
    volume: number
  }>
}
