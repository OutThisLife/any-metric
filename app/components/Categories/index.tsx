import * as Form from '@/components/Form'
import Module from '@/components/Module'
import { getTags } from '@/lib/queries'
import { CategoryItem } from '@/lib/utils'
import withSelections, { SelectionsProps } from '@/lib/withSelections'
import { orderBy } from 'lodash'
import { MdAddCircleOutline, MdClear } from 'react-icons/md'
import { BoxProps } from 'rebass'
import {
  compose,
  setDisplayName,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
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
  withSelections()
)(({ tags, addTag, delTag, handleMouse, ...props }) => (
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
          placeholder="Add new tag"
          icon={MdAddCircleOutline}
        />
      </Form.Container>

      {orderBy(tags, 'total', 'desc').map(t => (
        <Item key={t.title} {...t}>
          <i className="delete" onClick={() => delTag(t)}>
            <MdClear size={10} />
          </i>
        </Item>
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
}

interface CategoriesHandlers extends StateHandlerMap<CategoriesState> {
  addTag: StateHandler<CategoriesState>
  delTag: StateHandler<CategoriesState>
}
