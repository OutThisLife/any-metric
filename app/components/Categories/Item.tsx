import { MODIFY_DOC } from '@/lib/queries'
import {
  dateAge,
  moneyFormat,
  relTime,
  shortFormat,
  shouldRefresh
} from '@/lib/utils'
import withTagColour, { TagColour } from '@/lib/withTagColour'
import { EbayItem, Tag } from '@/server/schema/types'
import * as d3 from 'd3'
import { graphql } from 'react-apollo'
import { BreedingRhombusSpinner } from 'react-epic-spinners'
import { MdClear } from 'react-icons/md'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'

import Item from './Item.style'

export default compose<
  CategoryItemProps & CategoryItemHandles & TagColour,
  CategoryItemProps
>(
  setDisplayName('category-item'),
  withTagColour(),
  withState('loading', 'setLoading', false),
  withState('time', 'setTime', ({ updatedAt }) => updatedAt),
  graphql<CategoryItemProps, {}, {}, CategoryItemHandles>(MODIFY_DOC, {
    props: ({
      mutate,
      ownProps: { _id, title: keywords, setTime, setLoading }
    }) => ({
      onRefresh: () => {
        if (!('collect' in window)) {
          return
        }

        ;(window as any).collect(
          {
            keywords,
            paginationInput: {
              pageNumber: 1,
              entriesPerPage: 100
            }
          },
          ({ items }: { items: EbayItem[] }) => {
            setTime(new Date(), () => setTimeout(() => setLoading(false), 600))

            if (items.length) {
              const _ = new Notification(
                `[${keywords.toUpperCase()}] - ${items.length} found`,
                {
                  icon: '/static/favicon.ico',
                  body: `${moneyFormat(
                    items[0].sellingStatus.currentPrice[0].__value__
                  )} - ${items[0].title.slice(0, 25)}...`
                }
              )
            }

            window.requestAnimationFrame(() =>
              mutate({
                refetchQueries: items.length ? ['getProducts'] : [],
                variables: {
                  objectId: _id,
                  collectionName: 'tags',
                  input: {}
                }
              })
            )
          }
        )
      }
    })
  }),
  withHandlers<CategoryItemProps & CategoryItemHandles, CategoryItemHandles>(
    ({ setLoading, onRefresh }) => {
      let tm: d3.Timer

      if ('browser' in process) {
        Notification.requestPermission()
      }

      return {
        onRef: ({ loading, time }) => ref => {
          if (tm) {
            tm.stop()
          }

          if (!ref || loading) {
            return
          }

          const el = ref.querySelector('small')

          if (el instanceof HTMLElement) {
            el.innerText = relTime(time)

            tm = d3.timer(() => {
              el.innerText = relTime(time)

              if (shouldRefresh(time)) {
                setLoading(true, () => onRefresh())
                tm.stop()
              }
            })
          }
        }
      }
    }
  )
)(
  ({
    onRef,
    _id,
    loading,
    onDelete,
    onRefresh,
    setLoading,
    slug,
    theme,
    time,
    title,
    total,
    ...props
  }) => (
    <Item
      as="li"
      key={_id}
      data-tag={_id}
      data-hash={slug}
      className={`row ${loading ? 'loading' : ''}`}
      {...props}>
      <a href="javascript:;" tabIndex={-1}>
        <label>{shortFormat(total)}</label>

        <span>
          <span>{title}</span>

          <i className="delete" onClick={onDelete}>
            <MdClear size={10} />
          </i>
        </span>
      </a>

      {props.isQuery && (
        <time
          ref={onRef}
          title={time.toString()}
          onMouseDown={e => {
            e.stopPropagation()
            setLoading(true, () => onRefresh())
          }}>
          {loading ? (
            <BreedingRhombusSpinner
              className="spinner"
              size={16}
              color={theme.colours.secondary}
              animationDuration={1337}
              style={{ gridColumn: '1 / -1', margin: 'auto' }}
            />
          ) : (
            <>
              <small>{relTime(time)}</small>
              <i className={dateAge(time)} />
            </>
          )}
        </time>
      )}
    </Item>
  )
)

export interface CategoryItemProps extends Tag {
  time?: Date
  loading?: boolean
  onRef?: (ref: HTMLElement) => void
  setLoading?: (b: boolean, cb?: () => void) => void
  setTime?: (t: Date, cb?: () => void) => void
  onDelete?: React.MouseEventHandler<any>
}

export interface CategoryItemHandles {
  onRefresh?: () => void
}
