import { GET_BARE_PRODUCTS } from '@/lib/queries'
import { Product } from '@/server/schema/types'
import orderBy from 'lodash/orderBy'
import { func, string } from 'prop-types'
import { DataValue, graphql } from 'react-apollo'
import { SwappingSquaresSpinner } from 'react-epic-spinners'
import { MeasuredComponentProps, withContentRect } from 'react-measure'
import { sma } from 'react-stockcharts/lib/indicator'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { last } from 'react-stockcharts/lib/utils'
import { Box, Flex } from 'rebass'
import {
  compose,
  setDisplayName,
  withContext,
  withPropsOnChange,
  withState
} from 'recompose'

import Tabs from '../Tabs'
import Times from '../Times'
import Price from './Price'

export const isDesktop = () => 'browser' in process && window.innerWidth > 1025

export default compose<ChartProps, {}>(
  setDisplayName('price'),
  withContentRect(['client', 'bounds']),
  withState('input', 'setInput', {}),
  withState('order', 'setOrder', 'date,desc'),
  withContext(
    { order: string, setOrder: func, setInput: func },
    ({ order, setOrder, setInput }) => ({
      order,
      setOrder,
      setInput
    })
  ),
  graphql<ChartProps, { products: Product[] }>(GET_BARE_PRODUCTS, {
    options: ({ input }) => ({
      ssr: false,
      variables: { input }
    })
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
        top: isDesktop() ? 70 : 25,
        right: isDesktop() ? 70 : 25,
        bottom: isDesktop() ? 40 : 20,
        left: isDesktop() ? 70 : 25
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
)(({ measureRef, contentRect: rect, data: { loading }, chart }) => (
  <Box as="section" ref={measureRef}>
    {(loading && !('data' in chart)) ||
    !('bounds' in rect) ||
    isNaN(rect.bounds.width) ? (
      <Loader size={120} />
    ) : chart.data.length < 10 ? (
      <span style={{ justifySelf: 'center' }}>not enough datapoints</span>
    ) : (
      <Price
        width={isDesktop() ? rect.bounds.width / 2 : rect.client.width}
        height={isDesktop() ? rect.bounds.height / 2 : rect.client.width / 2}
        ratio={1}
        {...chart}
        {...rect}
      />
    )}

    <Box as="aside">
      <Tabs />

      {loading && !('data' in chart) ? (
        <Loader size={60} />
      ) : (
        <Times key={chart.data.length} chart={chart} rect={rect} />
      )}
    </Box>
  </Box>
))

const Loader = (props: any) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    css={`
      height: calc(100vh - var(--pad));
      overflow: hidden;

      @media (max-width: 1025px) {
        padding: var(--pad);
      }
    `}>
    <SwappingSquaresSpinner
      className="chart-spinner"
      color="#ddd"
      animationDuration={668}
      {...props}
    />
  </Flex>
)

export interface ChartProps extends Partial<MeasuredComponentProps> {
  chart?: ChartState
  data?: DataValue<{ products: Product[] }>
  input?: { [key: string]: any }
  setInput?: (a: any) => void
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
