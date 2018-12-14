import { MODIFY_DOC } from '@/lib/queries'
import { dateAge, relTime } from '@/lib/utils'
import withTagColour, { TagColour } from '@/lib/withTagColour'
import { Tag } from '@/server/schema/types'
import * as d3 from 'd3'
import { graphql } from 'react-apollo'
import { BreedingRhombusSpinner } from 'react-epic-spinners'
import { MdClear } from 'react-icons/md'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'

import { CategoriesHandlers } from '.'
import Item from './Item.style'

let tm: any = {}

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
          (_, { fetchMoreResult }) => {
            setTime(new Date(), () => setTimeout(() => setLoading(false), 600))

            window.requestAnimationFrame(
              async () =>
                await mutate({
                  refetchQueries: fetchMoreResult ? ['getProducts'] : [],
                  variables: {
                    objectId: _id,
                    collectionName: 'tags',
                    input: JSON.parse(
                      JSON.stringify({
                        $set: { updatedAt: new Date() }
                      })
                    )
                  }
                })
            )
          }
        )
      }
    })
  }),
  withHandlers<CategoryItemProps, CategoryItemHandles>(() => ({
    onRef: ({ loading, time }) => ref => {
      if ('stop' in tm) {
        tm.stop()
      }

      if (!ref || loading) {
        return
      }

      const el = ref.querySelector('small')

      if (el instanceof HTMLElement) {
        el.innerText = relTime(time)
        tm = d3.interval(() => (el.innerText = relTime(time)), 36e2)
      }
    }
  }))
)(
  ({
    theme,
    setLoading,
    loading,
    _id,
    onRef,
    onDelete,
    onFilter,
    onRefresh,
    title,
    total,
    time,
    ...props
  }) => (
    <Item
      as="li"
      key={_id}
      data-tag={_id}
      className={`row ${loading ? 'loading' : ''}`}
      {...props}>
      <a href="javascript:;" tabIndex={-1} onClick={onFilter}>
        <label>{total}</label>

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
  onDelete?: () => CategoriesHandlers['handleDelete']
  onFilter?: CategoriesHandlers['handleFilter']
}

export interface CategoryItemHandles {
  onRefresh?: () => void
}
