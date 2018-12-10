import * as Form from '@/components/Form'
import Module from '@/components/Module'
import { getTags } from '@/lib/queries'
import { CategoryItem } from '@/lib/utils'
import withSelections, { SelectionsProps } from '@/lib/withSelections'
import { omit, orderBy } from 'lodash'
import { MdAddCircleOutline } from 'react-icons/md'
import { BoxProps } from 'rebass'
import {
  compose,
  mapProps,
  setDisplayName,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  withHandlers,
  withStateHandlers
} from 'recompose'

import Item from './Item'
import Categories from './style'

export default compose<
  CategoriesHandlers & CategoriesState & CategoriesProps,
  CategoriesProps
>(
  setDisplayName('categories'),
  getTags(),
  withStateHandlers<CategoriesState, CategoriesHandlers, CategoriesProps>(
    ({ initialTags: tags = [] }) => ({ tags }),
    {
      addTag: ({ tags }) => (tag: CategoryItem) => {
        if (!tags.find(t => shallowEqual(t, tag))) {
          tags.push(tag)
        }

        return { tags }
      },

      delTag: ({ tags }) => (tag: CategoryItem) => {
        tags.splice(tags.findIndex(t => t === tag), 1)
        return { tags }
      }
    }
  ),
  withSelections(),
  withHandlers<CategoriesHandlers, CategoriesProps>(() => ({
    handleDelete: ({ delTag }) => t =>
      window.confirm(
        'Are you sure you want to delete this tag? All references will be lost.'
      ) && delTag(t)
  })),
  mapProps(props => omit(props, ['data']))
)(({ tags, addTag, delTag, handleDelete, handleMouse, ...props }) => (
  <Module>
    <Categories id="filters" m={0} p={0} onMouseDown={handleMouse} {...props}>
      <Form.Container
        onSubmit={e => {
          const el = e.currentTarget.querySelector('input')

          addTag({
            title: el.value,
            total: 0
          })

          el.value = ''
          el.blur()
        }}>
        <Form.Input
          required
          tabIndex={-1}
          placeholder="Add new tag"
          icon={MdAddCircleOutline}
        />
      </Form.Container>

      {orderBy(tags, 'total', 'desc').map(t => (
        <Item key={t.title} handleDelete={handleDelete} {...t} />
      ))}
    </Categories>
  </Module>
))

export interface CategoriesState {
  tags?: CategoryItem[]
}

export interface CategoriesProps extends BoxProps, SelectionsProps {
  as?: any
  initialTags?: CategoryItem[]
  handleDelete?: (t: string) => void
}

export interface CategoriesHandlers extends StateHandlerMap<CategoriesState> {
  addTag: StateHandler<CategoriesState>
  delTag: StateHandler<CategoriesState>
}
