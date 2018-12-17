import * as Form from '@/components/Form'
import Module from '@/components/Module'
import { CREATE_TAG, getTags, REMOVE_DOC } from '@/lib/queries'
import { select } from '@/lib/withSelections'
import withTags, { TagHandlers, TagState } from '@/lib/withTags'
import { DataTableFilter } from '@/pages/Dashboard'
import { Tag } from '@/server/schema/types'
import { orderBy } from 'lodash'
import { RouterProps } from 'next/router'
import { func, object } from 'prop-types'
import { graphql } from 'react-apollo'
import { BoxProps } from 'rebass'
import {
  compose,
  getContext,
  setDisplayName,
  withHandlers,
  withProps
} from 'recompose'

import Item from './Item'
import Categories from './style'

export default compose<
  CategoriesHandlers & CategoriesProps & TagHandlers,
  CategoriesProps
>(
  setDisplayName('categories'),
  getContext({ filter: func, router: object }),
  withTags(
    getTags(),
    graphql<TagHandlers, { createTag: Tag[] }, {}, CategoriesHandlers>(
      CREATE_TAG,
      {
        props: ({ mutate, ownProps: { addTag, updateTag } }) => ({
          handleAdd: async tag => {
            addTag(tag)

            window.requestAnimationFrame(() =>
              mutate({
                refetchQueries: ['getTags'],
                variables: { input: { title: tag.title } },
                update: (_, { data: { createTag } }) => updateTag(createTag)
              })
            )
          }
        })
      }
    ),
    graphql<
      CategoriesProps & CategoriesHandlers & TagHandlers,
      {},
      {},
      CategoriesHandlers
    >(REMOVE_DOC, {
      props: ({ mutate, ownProps: { delTag, filter } }) => ({
        handleDelete: async tag => {
          if (!window.confirm('Are you sure? All references will be lost.')) {
            return
          }

          delTag(tag)

          if (location.pathname.endsWith(tag.slug)) {
            filter({
              action: 'RESET'
            })

            window.history.replaceState(
              null,
              null,
              location.href.replace(location.pathname, '')
            )
          }

          window.requestAnimationFrame(() =>
            mutate({
              refetchQueries: ['getTags', 'getProducts'],
              variables: { objectId: tag._id, collectionName: 'tags' }
            })
          )
        }
      })
    })
  ),
  withHandlers<CategoriesProps & CategoriesHandlers, CategoriesHandlers>(
    () => ({
      handleClick: ({ filter }) => e => {
        select(e.target as HTMLElement)

        setTimeout(() => {
          const $checked = document.querySelectorAll('#filters [data-checked]')

          if (!$checked.length) {
            filter({
              value: '',
              action: 'RESET'
            })

            return
          }

          window.requestAnimationFrame(() =>
            filter({
              action: 'TAG',
              value: [].slice
                .call($checked)
                .map((el: HTMLElement) => el.dataset.tag)
                .join(',')
            })
          )
        }, 350)
      },

      handleSubmit: ({ handleAdd }) => ({ currentTarget }) => {
        const el = currentTarget.querySelector('input')

        handleAdd({
          _id: Math.random()
            .toString(20)
            .substring(3),
          title: el.value,
          isQuery: false,
          total: 0
        })

        el.value = ''
        el.blur()
      }
    })
  ),
  withHandlers<CategoriesProps & CategoriesHandlers, CategoriesHandlers>(
    () => ({
      onRef: ({ handleClick, router }) => ref => {
        if (!ref) {
          return
        }

        if (router.query.category) {
          const $a = document.querySelector(
            `[data-hash="${router.query.category}"]:not([data-checked])`
          )

          if ($a instanceof HTMLElement) {
            handleClick({
              target: $a
            } as any)
          }
        }
      }
    })
  ),
  withProps(({ tags }) => ({
    tags: orderBy(tags, ['isQuery', 'createdAt'], ['desc', 'desc'])
  }))
)(({ onRef, total, tags, handleSubmit, handleClick, handleDelete }) => (
  <Module>
    <h5>
      Products &amp; Tags <span>{total}</span>
    </h5>

    <Categories id="filters" ref={onRef} onClick={handleClick}>
      <Form.Container onSubmit={handleSubmit}>
        <Form.Input required placeholder="Add basic tag" tabIndex={-1} />
      </Form.Container>

      {tags.map(t => (
        <Item
          key={t._id}
          onDelete={e => {
            e.stopPropagation()
            handleDelete(t)
          }}
          {...t}
        />
      ))}
    </Categories>
  </Module>
))

export interface CategoriesHandlers {
  filter?: DataTableFilter
  onRef?: (ref: HTMLElement) => void
  handleClick?: React.MouseEventHandler<HTMLElement>
  handleAdd?: (t: Tag) => any
  handleDelete?: (t: Tag) => any
  handleSubmit?: React.FormEventHandler<HTMLFormElement>
}

export interface CategoriesProps extends BoxProps, TagState {
  router?: RouterProps
  as?: any
  total?: number
}
