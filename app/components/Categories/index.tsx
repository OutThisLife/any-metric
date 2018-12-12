import * as Form from '@/components/Form'
import Module from '@/components/Module'
import {
  CREATE_TAG,
  GET_PRODUCTS,
  GET_TAGS,
  getTags,
  REMOVE_DOC
} from '@/lib/queries'
import withSelections, { SelectionsProps } from '@/lib/withSelections'
import withTags, { TagHandlers, TagState } from '@/lib/withTags'
import { Tag } from '@/server/schema/types'
import { orderBy } from 'lodash'
import { graphql } from 'react-apollo'
import { BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import Item from './Item'
import Categories from './style'

export default compose<
  CategoriesHandlers & CategoriesProps & TagHandlers,
  CategoriesProps
>(
  setDisplayName('categories'),
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
                refetchQueries: [{ query: GET_TAGS }],
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
              refetchQueries: [{ query: GET_TAGS }, { query: GET_PRODUCTS }],
              variables: { objectId: tag._id, collectionName: 'tags' }
            })
          )
        }
      })
    })
  ),
  withSelections()
)(({ tags, handleAdd, handleDelete, handleMouse, ...props }) => (
  <Module>
    <Categories id="filters" onMouseDown={handleMouse} {...props}>
      <Form.Container
        onSubmit={e => {
          const el = e.currentTarget.querySelector('input')

          handleAdd({
            _id: Math.random()
              .toString(20)
              .substring(3),
            title: el.value,
            total: 0
          })

          el.value = ''
          el.blur()
        }}>
        <Form.Input required tabIndex={-1} placeholder="Add tags" />
      </Form.Container>

      {orderBy(tags, ['isQuery', 'total'], ['desc', 'desc']).map(t => (
        <Item key={t._id} onDelete={() => handleDelete(t)} {...t} />
      ))}
    </Categories>
  </Module>
))

export interface CategoriesHandlers {
  handleAdd?: (t: Tag) => any
  handleDelete?: (t: Tag) => any
}

export interface CategoriesProps extends BoxProps, SelectionsProps, TagState {
  as?: any
}
