import * as Form from '@/components/Form'
import Module from '@/components/Module'
import {
  CREATE_TAG,
  getTags,
  REMOVE_DOC,
  TagHandlers,
  TagState
} from '@/lib/queries'
import withSelections, { SelectionsProps } from '@/lib/withSelections'
import { Tag } from '@/server/schema/types'
import { omit, orderBy } from 'lodash'
import { BoxProps } from 'rebass'
import { compose, mapProps, setDisplayName, withHandlers } from 'recompose'

import Item from './Item'
import Categories from './style'

export default compose<
  CategoriesHandlers & CategoriesProps & TagHandlers,
  CategoriesProps
>(
  setDisplayName('categories'),
  getTags(),
  withSelections(),
  mapProps<CategoriesProps, CategoriesProps>(({ tags, ...props }) => ({
    ...omit(props, ['data']),
    productTags: tags.filter(t => t.isQuery),
    tags: tags.filter(t => !t.isQuery)
  })),
  withHandlers<CategoriesProps & TagHandlers, CategoriesHandlers>(() => ({
    handleAdd: ({ client, addTag }) => (t: Tag) => {
      addTag(t)

      window.requestAnimationFrame(
        async () =>
          await client.mutate({
            mutation: CREATE_TAG,
            variables: {
              input: {
                title: t.title
              }
            }
          })
      )
    },

    handleDelete: ({ client, delTag }) => (t: Tag) => {
      if (
        window.confirm(
          'Are you sure you want to delete this tag? All references will be lost.'
        )
      ) {
        delTag(t)

        window.requestAnimationFrame(
          async () =>
            await client.mutate({
              mutation: REMOVE_DOC,
              variables: {
                objectId: t._id,
                collectionName: 'tags'
              }
            })
        )
      }
    }
  }))
)(({ productTags, tags, handleAdd, handleDelete, handleMouse, ...props }) => (
  <Module>
    <Categories id="filters" onMouseDown={handleMouse} {...props}>
      {orderBy(productTags, 'createdAt').map(t => (
        <Item key={t._id} {...t} />
      ))}

      <Form.Container
        onSubmit={e => {
          const el = e.currentTarget.querySelector('input')

          handleAdd({
            _id: Math.random().toString(),
            title: el.value,
            total: 0
          })

          el.value = ''
          el.blur()
        }}>
        <Form.Input required tabIndex={-1} placeholder="Add tags" />
      </Form.Container>

      {orderBy(tags, 'total', 'desc').map(t => (
        <Item key={t._id} handleDelete={() => handleDelete(t)} {...t} />
      ))}
    </Categories>
  </Module>
))

export interface CategoriesHandlers {
  handleAdd: (t: Tag) => void
  handleDelete: (t: Tag) => void
}

export interface CategoriesProps extends BoxProps, SelectionsProps, TagState {
  as?: any
  productTags?: TagState['tags']
}
