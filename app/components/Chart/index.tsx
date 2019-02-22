import { GET_PRODUCTS } from '@/lib/queries'
import { isDesktop } from '@/pages/Dashboard'
import { Product, Tag, View } from '@/server/schema/types'
import orderBy from 'lodash/orderBy'
import { func, number, object, string } from 'prop-types'
import { DataValue, graphql } from 'react-apollo'
import { MeasuredComponentProps, withContentRect } from 'react-measure'
import { sma } from 'react-stockcharts/lib/indicator'
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { last } from 'react-stockcharts/lib/utils'
import { Box } from 'rebass'
import {
  compose,
  getContext,
  setDisplayName,
  shouldUpdate,
  withContext,
  withPropsOnChange,
  withState
} from 'recompose'

export default compose<ChartProps & ChartRenderProps, ChartRenderProps>(
  setDisplayName('price'),
  getContext({ session: object, index: number }),
  withState('input', 'setInput', {}),
  withState('order', 'setOrder', 'date,desc'),
  shouldUpdate<ChartProps>(
    (p, np) =>
      !('tags' in np.input && 'browser' in process) ||
      ('tags' in p.input && p.input.tags.$in[0] !== np.input.tags.$in[0]) ||
      p.index !== np.index ||
      document.body.getAttribute('data-proc') === np.input.tags.$in[0]
  ),
  graphql<ChartProps, { products: Product[] }>(GET_PRODUCTS, {
    skip: ({ session }) => !session.tags.length,
    options: ({ session, input = {} }) => {
      if (!('tags' in input)) {
        Object.assign(input, {
          tags: {
            $in: (session.tags as Tag[]).map(t => t._id)
          }
        })
      }

      return {
        ssr: false,
        variables: { input }
      }
    }
  }),
  withContext(
    { order: string, setOrder: func, setInput: func },
    ({ order, setOrder, setInput }) => ({
      order,
      setOrder,
      setInput
    })
  ),
  withPropsOnChange<ChartProps, ChartProps>(
    ['data'],
    ({ data: initialData }) => {
      if (!initialData || initialData.loading) {
        return { data: { products: [], loading: true }, chart: { data: [] } }
      }

      const ema = sma()
        .options({ windowSize: 20 })
        .skipUndefined(true)
        .merge((d, avg) => ({ ...d, avg }))
        .accessor(d => d.avg)

      const calculatedData = ema(orderBy(initialData.products, 'date', 'asc'))
      const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
        d => new Date(d.date)
      )

      const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
        calculatedData
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
  ),
  withContentRect(['client', 'bounds'])
)(({ measureRef, children, ...props }) => (
  <Box as="section" ref={measureRef}>
    {children(props)}
  </Box>
))

export interface ChartRenderProps {
  children: (a: ChartProps) => JSX.Element
}

export interface ChartProps extends Partial<MeasuredComponentProps> {
  chart?: ChartState
  session?: View
  index?: number
  data?: Partial<DataValue<{ view: View; products: Product[] }>>
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
