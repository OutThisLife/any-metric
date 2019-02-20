import { GET_BARE_PRODUCTS } from '@/lib/queries'
import { Product } from '@/server/schema/types'
import orderBy from 'lodash/orderBy'
import { DataValue, graphql, GraphqlQueryControls } from 'react-apollo'
import { OrbitSpinner } from 'react-epic-spinners'
import Measure from 'react-measure'
import { sma } from 'react-stockcharts/lib/indicator'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { last } from 'react-stockcharts/lib/utils'
import {
  compose,
  lifecycle,
  setDisplayName,
  withPropsOnChange
} from 'recompose'

import Loader from './Loader'
import Price from './Price'
import Times from './Times'

export default compose<ChartProps, {}>(
  setDisplayName('price'),
  graphql<ChartProps, { products: Product[] }>(GET_BARE_PRODUCTS, {
    options: {
      ssr: false,
      notifyOnNetworkStatusChange: true
    },
    props: ({ data }) => ({
      data,
      fetchMore: async (input = { tags: [] }) => {
        const hash = JSON.stringify(input.tags)
        const lastInput = (window as any).lastInput || ''

        if (hash === lastInput) {
          return
        }

        ;(window as any).lastInput = hash

        return data.fetchMore({
          variables: { input },
          updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult || prev
        })
      }
    })
  }),
  lifecycle<ChartProps, {}, {}>({
    componentDidMount() {
      if ('browser' in process) {
        ;(window as any).updateChart = this.props.fetchMore.bind(this)
      }
    }
  }),
  withPropsOnChange<ChartProps, ChartProps>(
    ['data'],
    ({ data: { products = [], loading } }) => {
      if (loading) {
        return { chart: {} }
      }

      const ema = sma()
        .options({ windowSize: 20 })
        .skipUndefined(true)
        .merge((d, avg) => ({ ...d, avg }))
        .accessor(d => d.avg)

      const initialData = ema(orderBy(products, 'date', 'asc'))
      const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
        d => new Date(d.date)
      )

      const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
        initialData
      )

      const start = xAccessor(last(data))
      const end = xAccessor(data[Math.max(0, data.length - start)])
      const xExtents = [start, end]

      const margin = {
        top: 70,
        right: 70,
        bottom: 30,
        left: 70
      }

      const tickStyle: any = {
        fontSize: 12,
        gridWidth: margin.left - margin.right,
        gridHeight: margin.top - margin.bottom,
        tickStrokeDashArray: 'LongDashDotDot',
        tickStrokeOpacity: 0.05,
        tickStrokeWidth: 1,
        stroke: '#A8A8A8',
        tickStroke: '#A8A8A8'
      }

      return {
        chart: {
          data,
          displayXAccessor,
          margin,
          tickStyle,
          xAccessor,
          xExtents,
          xScale,
          ema
        }
      }
    }
  )
)(({ data: { loading }, chart }) => (
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
        {loading ||
        !('data' in chart) ||
        chart.data.length < 10 ||
        !('bounds' in rect) ||
        isNaN(rect.bounds.width) ? (
          <OrbitSpinner
            className="chart-spinner"
            size={120}
            color="#ddd"
            animationDuration={668}
            style={{}}
          />
        ) : (
          <>
            <Price
              width={rect.bounds.width - 500}
              height={rect.bounds.height}
              ratio={1}
              {...chart}
            />

            <Times {...chart} />
          </>
        )}
      </div>
    )}
  </Measure>
))

export interface ChartProps {
  chart?: ChartState
  data?: DataValue<{ products: Product[] }>
  fetchMore?: (input?: {
    [key: string]: any
  }) => Promise<GraphqlQueryControls<{ products: Product[] }>['fetchMore']>
}

export interface ChartState {
  data?: Product[]
  displayXAccessor?: any
  ema?: any
  height?: number
  id?: string
  ratio?: number
  width?: number
  xAccessor?: any
  xExtents?: any
  xScale?: any[]
  initialData?: Array<{
    id: string | number
    date: Date
    price: number
  }>
  margin?: {
    top: number
    right: number
    left: number
    bottom: number
  }
  onRef?: (ref: HTMLElement) => void
  onSelect?: () => void
  tickStyle?: any
}

export { Loader }
