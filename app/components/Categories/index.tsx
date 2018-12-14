import * as Form from '@/components/Form'
import Module from '@/components/Module'
import { CREATE_TAG, getTags, REMOVE_DOC } from '@/lib/queries'
import withSelections, { SelectionsProps } from '@/lib/withSelections'
import withTags, { TagHandlers, TagState } from '@/lib/withTags'
import { DataTableFilter } from '@/pages/Dashboard'
import { Tag } from '@/server/schema/types'
import { orderBy } from 'lodash'
import { func } from 'prop-types'
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
  getContext({ filter: func }),
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
    graphql<TagHandlers, {}, {}, CategoriesHandlers>(REMOVE_DOC, {
      props: ({ mutate, ownProps: { delTag } }) => ({
        handleDelete: async tag => {
          if (!window.confirm('Are you sure? All references will be lost.')) {
            return
          }

          delTag(tag)

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
  withSelections(),
  withHandlers<CategoriesProps & CategoriesHandlers, CategoriesHandlers>(
    () => ({
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
      },

      handleFilter: ({ filter }) => () => {
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
      }
    })
  ),
  withProps(({ tags }) => ({
    tags: orderBy(tags, ['isQuery', 'createdAt'], ['desc', 'desc'])
  }))
)(({ tags, handleSubmit, handleMouse, handleFilter, handleDelete }) => (
  <Module>
    <Categories
      id="filters"
      onMouseDown={e => {
        e.persist()
        handleMouse(e)
        handleFilter(e)
      }}>
      <Form.Container onSubmit={handleSubmit}>
        <Form.Input required placeholder="Add tags" tabIndex={-1} />
      </Form.Container>

      {tags.map(t => (
        <Item key={t._id} onDelete={() => handleDelete(t)} {...t} />
      ))}
    </Categories>
  </Module>
))

export interface CategoriesHandlers {
  filter?: DataTableFilter
  handleAdd?: (t: Tag) => any
  handleDelete?: (t: Tag) => any
  handleFilter?: React.MouseEventHandler<HTMLAnchorElement>
  handleSubmit?: React.FormEventHandler<HTMLFormElement>
}

export interface CategoriesProps extends BoxProps, SelectionsProps, TagState {
  as?: any
}
