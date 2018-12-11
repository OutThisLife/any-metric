import * as Form from '@/components/Form'
import Module from '@/components/Module'
import { getTags, TagHandlers, TagState } from '@/lib/queries'
import withSelections, { SelectionsProps } from '@/lib/withSelections'
import { Tag } from '@/server/schema/types'
import { omit, orderBy } from 'lodash'
import { MdAddCircleOutline } from 'react-icons/md'
import { BoxProps } from 'rebass'
import { compose, mapProps, setDisplayName } from 'recompose'

import Item from './Item'
import Categories from './style'

export default compose<CategoriesProps & TagHandlers, CategoriesProps>(
  setDisplayName('categories'),
  getTags(),
  withSelections(),
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
        <Item key={t.title} handleDelete={() => delTag(t)} {...t} />
      ))}
    </Categories>
  </Module>
))

export interface CategoriesProps extends BoxProps, SelectionsProps, TagState {
  as?: any
  handleDelete?: (t: Tag) => void
}
