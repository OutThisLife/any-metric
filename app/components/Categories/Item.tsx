import { MODIFY_DOC } from '@/lib/queries'
import { dateAge, moneyFormat, relTime, shortFormat } from '@/lib/utils'
import withTagColour, { TagColour } from '@/lib/withTagColour'
import { EbayResult, Tag } from '@/server/schema/types'
import { graphql } from 'react-apollo'
import { BreedingRhombusSpinner } from 'react-epic-spinners'
import { MdClear } from 'react-icons/md'
import { compose, setDisplayName, withState } from 'recompose'

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
            save: true
          },
          ({ total, totalPages, items }: EbayResult) => {
            setTime(new Date(), () => setTimeout(() => setLoading(false), 600))

            let i = parseInt(totalPages as string, 10)
            while (i > 1) {
              ;(window as any).collect({
                keywords,
                save: true,
                paginationInput: {
                  pageNumber: i--,
                  entriesPerPage: 100
                }
              })
            }

            if (total > 0) {
              const { title, sellingStatus } = items[items.length - 1]

              const _ = new Notification(
                `[${keywords.toUpperCase()}] - ${total} found`,
                {
                  icon: '/static/favicon.ico',
                  body: `${moneyFormat(
                    sellingStatus.currentPrice[0].__value__
                  )} - ${title.slice(0, 25)}...`
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
  })
)(
  ({
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
      data-hash={slug}
      data-action={props.isQuery ? 'TAG' : 'SEARCH'}
      data-value={props.isQuery ? _id : title}
      className={`row ${loading ? 'loading' : ''}`}
      {...props}>
      <a href="javascript:;" tabIndex={-1}>
        {props.isQuery ? <label>{shortFormat(total)}</label> : <label />}

        <span>
          <span>{title}</span>

          <i className="delete" onClick={onDelete}>
            <MdClear size={10} />
          </i>
        </span>
      </a>

      {props.isQuery && (
        <time
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
