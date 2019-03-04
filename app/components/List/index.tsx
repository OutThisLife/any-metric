import { dateFormat, moneyFormat } from '@/lib/utils'
import { isDesktop } from '@/pages/Dashboard'
import { Product, Tag } from '@/server/schema/types'
import orderBy from 'lodash/orderBy'
import lunr from 'lunr'
import { func, object, string } from 'prop-types'
import { MeasuredComponentProps } from 'react-measure'
import VirtualList from 'react-tiny-virtual-list'
import { Box, Flex } from 'rebass'
import {
  compose,
  getContext,
  setDisplayName,
  withHandlers,
  withProps,
  withState
} from 'recompose'
import { prop } from 'styled-tools'

import { ChartState } from '../Chart'

export default compose<TimesProps & TimesHandlers, TimesProps>(
  setDisplayName('chart-list'),
  getContext({
    order: string,
    setOrder: func,
    index: string,
    scrollToIndex: func,
    input: object,
    setInput: func
  }),
  withState('data', 'updateData', ({ chart }) => chart.data || []),
  withHandlers<TimesProps, TimesHandlers>(
    ({ chart: { data }, setOrder, setInput, scrollToIndex, updateData }) => {
      const idx = lunr(function() {
        this.ref('_id')
        this.field('title')
        data.map(this.add.bind(this))
      })

      const search = (v): Product[] => {
        if (v.length) {
          try {
            return idx.search(v).map(r => data.find(d => d._id === r.ref))
          } catch (err) {
            return []
          }
        }

        return data
      }

      return {
        handleChange: () => ({ currentTarget: { name, value } }) =>
          scrollToIndex('0', () => {
            if (name === 'order') {
              setOrder(value)
            } else if (name === 'status') {
              setInput({
                status: value.length
                  ? value
                  : {
                      $ne: 'EndedWithoutSales'
                    }
              })
            }
          }),

        handleInput: () => ({ currentTarget: { value } }) =>
          scrollToIndex('0', () => updateData(search(value.trim())))
      }
    }
  ),
  withProps(({ order, data = [] }) => ({
    data: orderBy(data, ...order.split(','))
  }))
)(
  ({
    index,
    order,
    input: { status = '' },
    data = [],
    rect,
    handleChange,
    handleInput
  }) => (
    <>
      <Flex
        as="form"
        css={`
          display: flex;
          align-items: center;
          padding: 5px 0;

          @media (max-width: 1025px) {
            padding-top: 0;
          }

          input,
          select {
            margin-top: 0;
            margin-bottom: 0;
            margin-right: 0;
          }

          * + * {
            margin-left: 5px;
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

        <select defaultValue={status} name="status" onChange={handleChange}>
          <option value="">Status</option>
          <option>Active</option>
          <option>EndedWithSales</option>
        </select>

        <select defaultValue={order} name="order" onChange={handleChange}>
          <option value="date,desc">Date / DESC</option>
          <option value="date,asc">Date / ASC</option>
          <option value="close,desc">Price / DESC</option>
          <option value="close,asc">Price / ASC</option>
        </select>

        <div>{data.length} items</div>
      </Flex>

      {!isNaN(rect.bounds.height) && (
        <VirtualList
          itemSize={25}
          itemCount={Math.max(1, data.length)}
          height={isDesktop() ? rect.bounds.height : rect.bounds.height / 1.8}
          scrollToIndex={data.findIndex(d => d._id === index.toString()) || 0}
          renderItem={({ index: i, style }) => {
            if (!data.length) {
              return (
                <Flex key={i} style={style}>
                  🤔
                </Flex>
              )
            }

            const d = data[i]

            return (
              <Flex
                key={i}
                id={`t-${d._id}`}
                data-src={d.image}
                style={style}
                alignItems="center"
                justifyContent="center"
                className={`${
                  index === d._id ? 'active' : ''
                } status-${d.status.toLocaleLowerCase()}`}
                onMouseEnter={() => {
                  localStorage.setItem('url', d.url)
                  document.getElementById('zoom').setAttribute('src', d.image)
                }}
                onMouseLeave={() =>
                  document.getElementById('zoom').removeAttribute('src')
                }
                css={`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  position: relative;
                  border-bottom: 1px solid ${prop('theme.border')};

                  &:hover,
                  &.active {
                    z-index: 2;
                    font-weight: 700;
                    text-decoration: underline;
                    box-shadow: 0 0 25px ${prop('theme.border')};

                    a {
                      color: ${prop('theme.base')};
                    }
                  }

                  &.active {
                    z-index: 3;
                    background: ${prop('theme.brand')} !important;

                    a,
                    span {
                      color: ${prop('theme.bg')};
                    }
                  }

                  &.status-active i {
                    background: ${prop('theme.brand')};
                  }

                  &.status-endedwithsales i {
                    background: #da1212;
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

                      i {
                        display: inline-block;
                        width: 5px;
                        height: 5px;
                        margin-right: 0.5em;
                        vertical-align: middle;
                      }
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
                  <i />

                  <a
                    href={d.url}
                    target="_blank"
                    dangerouslySetInnerHTML={{ __html: d.title }}
                  />
                </span>

                <span className="date">{dateFormat(d.date)}</span>
                <span className="price">{moneyFormat(d.close)}</span>
              </Flex>
            )
          }}
        />
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
          max-width: 45vw;
          max-height: 45vh;
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
  )
)

export interface TimesProps {
  tags?: Tag[]
  chart?: ChartState
  rect?: MeasuredComponentProps['contentRect']
  data?: Product[]
  order?: string
  input?: any
  setInput?: (a: any, cb?: () => void) => void
  setOrder?: (a: string, cb?: () => void) => void
  updateData?: (a: Product[], cb?: () => void) => void
  index?: string
  scrollToIndex?: (a: string, cb?: () => void) => void
}

export interface TimesHandlers {
  handleInput?: React.KeyboardEventHandler<HTMLInputElement>
  handleChange?: React.ChangeEventHandler<HTMLSelectElement>
}
