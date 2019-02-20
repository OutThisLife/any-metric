import { Product } from '@/server/schema/types'
import { OrbitSpinner } from 'react-epic-spinners'
import Measure from 'react-measure'
import { sma } from 'react-stockcharts/lib/indicator'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { last } from 'react-stockcharts/lib/utils'
import {
  compose,
  flattenProp,
  lifecycle,
  setDisplayName,
  withHandlers,
  withState,
  withStateHandlers
} from 'recompose'

import Loader from './Loader'
import Price from './Price'

export const MA = sma()
  .options({ windowSize: 4, sourcePath: 'price' })
  .merge((d, c) => ({ ...d, MA: c }))
  .accessor(d => d.MA)

export default compose<ChartProps, ChartProps>(
  setDisplayName('price'),
  withState('isLoading', 'setLoading', true),
  withHandlers<ChartProps & ChartCVProps, ChartProps>(() => ({
    generateChart: ({ data: initialData, width, height }) => (
      filterFunc = () => true
    ) => {
      const calculatedData = MA(
        initialData.filter(filterFunc).map(d => ({
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
      const end = xAccessor(
        data[Math.max(0, data.length - Math.round(initialData.length / 2))]
      )
      const xExtents = [start, end]

      const margin = {
        top: 30,
        right: 90,
        bottom: 30,
        left: 30
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
  })),
  withStateHandlers<{}, {}, ChartProps>(
    ({ generateChart }) => ({ chart: generateChart() }),
    {
      updateChart: (_, { generateChart }) => (filterFunc = () => true) => ({
        chart: generateChart(filterFunc)
      })
    }
  ),
  lifecycle<ChartProps, {}>({
    componentDidUpdate() {
      if (this.props.data.length >= 25) {
        window.requestAnimationFrame(() => this.props.setLoading(false))
      } else if (!this.props.isLoading) {
        this.props.setLoading(true)
      }
    }
  }),
  flattenProp('chart')
)(({ isLoading, ...props }) => (
  <Measure bounds>
    {({ measureRef, contentRect: rect }) => (
      <div
        ref={measureRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: 'calc(100vw - 50px)',
          height: 'calc(33vh - 25px)',
          overflow: 'hidden'
        }}>
        {isLoading || props.data.length < 25 ? (
          <OrbitSpinner
            className="chart-spinner"
            size={120}
            color="#ddd"
            animationDuration={668}
            style={{}}
          />
        ) : (
          <Price
            width={rect.bounds.width}
            height={rect.bounds.height}
            ratio={1}
            {...props}
          />
        )}
      </div>
    )}
  </Measure>
))

export interface ChartProps {
  data?: any[]
  isLoading?: boolean
  setLoading?: (b: boolean, cb?: any) => void
  chart?: ChartState
  generateChart?: (a?: (p?: Product) => boolean) => ChartState
  updateChart?: (a?: (p?: Product) => boolean) => void
}

export interface ChartCVProps {
  id?: string
  data?: Product[]
  ratio?: number
  width?: number
  height?: number
  isModal?: boolean
  isDesktop?: boolean
  onSelect?: () => void
}

export interface ChartState extends ChartCVProps {
  onRef?: (ref: HTMLElement) => void
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
  margin?: {
    top: number
    right: number
    left: number
    bottom: number
  }
  tickStyle: any
}

export { Loader }
