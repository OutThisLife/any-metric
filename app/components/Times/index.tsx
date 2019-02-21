import { dateFormat, moneyFormat } from '@/lib/utils'
import { Product, Tag } from '@/server/schema/types'
import Fuse from 'fuse.js'
import orderBy from 'lodash/orderBy'
import { lighten } from 'polished'
import { func, number } from 'prop-types'
import { MeasuredComponentProps } from 'react-measure'
import VirtualList from 'react-tiny-virtual-list'
import { Box, Flex } from 'rebass'
import {
  compose,
  getContext,
  setDisplayName,
  withHandlers,
  withState
} from 'recompose'
import { prop, withProp } from 'styled-tools'

import { ChartProps, ChartState } from '../Chart'

export default compose<TimesProps & TimesHandlers, TimesProps>(
  setDisplayName('chart-times'),
  getContext({ index: number, scrollToIndex: func }),
  withState('data', 'updateData', ({ chart }) => chart.data || []),
  withHandlers<TimesProps, TimesHandlers>(
    ({ chart: { data }, scrollToIndex, updateData }) => ({
      handleChange: () => ({ currentTarget: { value } }) =>
        scrollToIndex(0, () => updateData(orderBy(data, ...value.split(',')))),

      handleInput: () => ({ currentTarget: { value, nextElementSibling } }) =>
        scrollToIndex(0, () =>
          updateData(
            orderBy(
              (() => {
                if (value.length) {
                  const fuse = new Fuse(data, {
                    keys: ['title']
                  })

                  return fuse.search(value)
                } else {
                  return data
                }
              })(),
              ...(nextElementSibling as HTMLSelectElement).value.split(',')
            )
          )
        )
    })
  )
)(({ data = [], index, rect, handleChange, handleInput }) => (
  <>
    <Flex
      as="form"
      css={`
        padding: 5px 0;

        @media (max-width: 1025px) {
          padding-top: 0;
        }

        > * {
          margin: 0;

          + * {
            margin-left: 2.5px;
          }
        }
      `}>
      <input
        type="text"
        onInput={handleInput}
        placeholder="Search"
        autoComplete="off"
        spellCheck={false}
        tabIndex={1}
      />

      <select onChange={handleChange}>
        <option value="date,desc">Date / DESC</option>
        <option value="date,asc">Date / ASC</option>
        <option value="close,desc">Price / DESC</option>
        <option value="close,asc">Price / ASC</option>
      </select>
    </Flex>

    {data.length > 0 ? (
      <VirtualList
        itemSize={25}
        itemCount={data.length}
        height={
          window.innerWidth > 1025
            ? rect.bounds.height
            : rect.bounds.height / 1.8
        }
        scrollToIndex={index}
        renderItem={({ index: i, style }) => (
          <Flex
            key={i}
            id={`t-${data[i]._id}`}
            data-src={data[i].image}
            style={style}
            alignItems="center"
            justifyContent="center"
            className={index === i ? 'active' : ''}
            onMouseEnter={() => {
              localStorage.setItem('url', data[i].url)
              document.getElementById('zoom').setAttribute('src', data[i].image)
            }}
            onMouseLeave={() =>
              document.getElementById('zoom').removeAttribute('src')
            }
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
              <a href={data[i].url} target="_blank">
                {data[i].title}
              </a>
            </span>

            <span className="date">{dateFormat(data[i].date)}</span>
            <span className="price">{moneyFormat(data[i].close)}</span>
          </Flex>
        )}
      />
    ) : (
      <span style={{ padding: '20px 10px' }}>no data found</span>
    )}

    <Box
      as="img"
      id="zoom"
      alt=""
      css={`
        z-index: 100;
        pointer-events: none;
        position: fixed;
        bottom: 0;
        left: 0;
        max-width: 33vw;
        max-height: 33vh;
        vertical-align: top;

        &:not([src]) {
          display: none;
        }

        @media (max-width: 1025px) {
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
  data?: Product[]
  updateData?: (a: Product[]) => void
  index?: number
  scrollToIndex?: (a: number, cb?: () => void) => void
  rect?: MeasuredComponentProps['contentRect']
}

export interface TimesHandlers {
  updateChart?: ChartProps['fetchMore']
  handleInput?: React.KeyboardEventHandler<HTMLInputElement>
  handleChange?: React.ChangeEventHandler<HTMLSelectElement>
}
