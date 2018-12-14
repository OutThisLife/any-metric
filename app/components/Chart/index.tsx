import Modal from '@/components/Modal'
import { Product } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import { lighten } from 'polished'
import { OrbitSpinner } from 'react-epic-spinners'
import { MeasuredComponentProps, withContentRect } from 'react-measure'
import {
  compose,
  lifecycle,
  setDisplayName,
  withHandlers,
  withState
} from 'recompose'
import { withTheme } from 'styled-components'

import Loader from './Loader'
import Price from './Price'
import { ZoomedChart } from './style'

export default compose<ChartProps & BaphoTheme, ChartProps>(
  setDisplayName('price'),
  withState('loading', 'setLoading', true),
  withTheme,
  withContentRect('bounds'),
  withHandlers<ChartProps, ChartProps>(({ loading, setLoading }) => ({
    loadChart: ({ data }) => () => {
      if (!('browser' in process) || !data.length) {
        return
      } else if (!loading && !data.length) {
        setLoading(true)
        return
      }

      const el = document.querySelector('.chart-spinner')

      if (el instanceof HTMLElement) {
        window.requestAnimationFrame(() => {
          el.style.opacity = '0'
          setTimeout(() => setLoading(false), 1100)
        })
      }
    }
  })),
  lifecycle<ChartProps, {}>({
    componentDidMount() {
      this.props.loadChart()
    },

    componentDidUpdate() {
      this.props.loadChart()
    }
  })
)(({ theme, loading, measureRef, contentRect, ...props }) => {
  const isDesktop = 'browser' in process && window.innerWidth >= 1025
  const width = contentRect.bounds.width
  const height = width * (isDesktop ? 0.7 : 0.4)

  return (
    <div
      ref={measureRef}
      id="chart-container"
      style={{
        position: 'relative',
        width: '100%'
      }}>
      <Modal
        id="price-chart-modal"
        isShown={!loading && /chart/.test(location.search)}
        render={() => {
          const w = window.innerWidth * (isDesktop ? 0.66 : 0.9)

          return (
            <ZoomedChart>
              <Price isModal={true} width={w} height={w * 0.54} {...props} />
            </ZoomedChart>
          )
        }}>
        {({ isOpen, toggle }) => (
          <>
            {loading ? (
              <OrbitSpinner
                className="chart-spinner"
                size={120}
                color={lighten(0.1, theme.colours.module)}
                animationDuration={668}
                style={{
                  margin: '-50% auto 0',
                  transition: 'opacity 1s linear'
                }}
              />
            ) : (
              <Price
                isDesktop={isDesktop}
                width={width}
                height={height}
                onSelect={() => toggle(!isOpen)}
                {...props}
              />
            )}
          </>
        )}
      </Modal>
    </div>
  )
})

export interface ChartProps extends Partial<MeasuredComponentProps> {
  data?: any[]
  isDesktop?: boolean
  loading?: boolean
  setLoading?: (b: boolean) => void
  loadChart?: () => void
}

export interface ChartCVProps {
  data?: Product[]
  ratio?: number
  width?: number
  height?: number
  isModal?: boolean
  isDesktop?: boolean
  onSelect?: () => void
}

export interface ChartState extends ChartCVProps {
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
