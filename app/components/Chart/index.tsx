import Modal from '@/components/Modal'
import { Product } from '@/server/schema/types'
import * as d3 from 'd3'
import { MdFullscreen } from 'react-icons/md'
import { MeasuredComponentProps, withContentRect } from 'react-measure'
import { compose, setDisplayName } from 'recompose'

import Text from '../Text'
import Loader from './Loader'
import Price from './Price'
import { ZoomedChart } from './style'

export default compose<ChartProps, ChartProps>(
  setDisplayName('price'),
  withContentRect('bounds')
)(({ measureRef, contentRect, ...props }) => (
  <div
    ref={measureRef}
    onMouseLeave={() => d3.timeout(unlink, 700)}
    style={{ position: 'relative', width: '100%' }}>
    {!isNaN(contentRect.bounds.width) && (
      <Modal
        id="price-chart-modal"
        isShown={'browser' in process && /chart/.test(location.search)}
        render={() => {
          const width = innerWidth * 0.66

          return (
            <ZoomedChart>
              <Price
                isModal={true}
                width={width}
                height={width * 0.54}
                {...props}
              />
            </ZoomedChart>
          )
        }}>
        {({ isOpen, toggle }) => (
          <>
            <Text
              as="a"
              href="javascript:;"
              onClick={() => toggle(!isOpen)}
              css={`
                display: block;
                width: 100%;
                font-size: 0.85rem;

                &[href] {
                  cursor: zoom-in;
                  color: ${({ theme }) => theme.colours.label};

                  svg {
                    transform: translate(0, -2px);
                  }
                }
              `}>
              <MdFullscreen size={16} />
              Expand
            </Text>

            <Price
              isDesktop={'browser' in process && window.innerWidth >= 1025}
              width={contentRect.bounds.width}
              height={contentRect.bounds.width * 0.7}
              {...props}
            />
          </>
        )}
      </Modal>
    )}
  </div>
))

export const unlink = () => {
  const $cur = document.querySelector('.chart-link')

  if ($cur) {
    $cur.classList.remove('chart-link')
  }
}

export interface ChartProps extends Partial<MeasuredComponentProps> {
  data: any[]
  isDesktop?: boolean
}

export interface ChartCVProps {
  data: Product[]
  ratio?: number
  width: number
  height: number
  isModal?: boolean
  isDesktop?: boolean
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
