import { dateFormat, moneyFormat } from '@/lib/utils'
import { Product, Tag } from '@/server/schema/types'
import { Box, Flex } from 'rebass'
import { compose, lifecycle, setDisplayName } from 'recompose'

import { lighten } from 'polished'
import { prop, withProp } from 'styled-tools'
import { ChartProps, ChartState } from '../Chart'

export default compose<TimesProps & TimesHandlers, TimesProps>(
  setDisplayName('chart-times'),
  lifecycle({
    componentDidMount(this: any) {
      this.handleKeyPress = e => {
        const $a = document.querySelector('[id].active [href]')

        if (e.key === 'w' && $a instanceof HTMLAnchorElement) {
          window.open($a.href, '_blank')
        }
      }

      window.addEventListener('keypress', this.handleKeyPress)
    },

    componentWillUnmount(this: any) {
      window.removeEventListener('keypress', this.handleKeyPress)
    }
  })
)(({ chart }) => (
  <>
    {[].slice
      .call(chart.data)
      .reverse()
      .map((d: Product) => (
        <Flex
          key={d._id}
          id={`t-${d._id}`}
          data-src={d.image}
          alignItems="center"
          justifyContent="center"
          onMouseEnter={() => {
            try {
              document.getElementById('zoom').setAttribute('src', d.image)
            } catch (err) {
              //
            }
          }}
          onMouseLeave={() => {
            try {
              document.getElementById('zoom').removeAttribute('src')
            } catch (err) {
              //
            }
          }}
          css={`
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid ${prop('theme.border')};

            &:hover {
              background: ${withProp(prop('theme.brand'), lighten(0.5))};
            }

            &.active {
              background: ${prop('theme.brand')} !important;

              a,
              span {
                color: ${prop('theme.bg')};
              }
            }

            span {
              display: block;
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              padding: 0.25em;

              &.title {
                flex: 1;
              }

              &.date {
                flex: 0.25;
              }

              &.price {
                flex: 0.25;
                text-align: right;
              }

              &:last-of-type {
                margin-left: auto;
              }
            }
          `}>
          <span className="title">
            <a href={d.url} target="_blank">
              {d.title}
            </a>
          </span>

          <span className="date">{dateFormat((d as any).date)}</span>
          <span className="price">{moneyFormat((d as any).close)}</span>
        </Flex>
      ))}

    <Box
      as="img"
      id="zoom"
      alt=""
      css={`
        pointer-events: none;
        position: fixed;
        right: 0;
        bottom: 0;
        max-width: 33vw;
        max-height: 33vh;
        vertical-align: top;

        &:not([src]) {
          display: none;
        }
      `}
    />
  </>
))

export interface TimesProps {
  tags?: Tag[]
  totalProducts?: number
  chart?: ChartState
  tab?: string
  setTab?: (a: string) => void
}

export interface TimesHandlers {
  updateChart?: ChartProps['fetchMore']
  [key: string]: React.MouseEventHandler<HTMLAnchorElement>
}
