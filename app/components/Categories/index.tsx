import Module from '@/components/Module'
import withSelections, { SelectionsProps } from '@/lib/withSelections'
import { DataTableFilter } from '@/pages/Dashboard'
import { FakeResult } from '@/server/schema/types'
import { omit, orderBy } from 'lodash'
import { func } from 'prop-types'
import { BoxProps } from 'rebass'
import {
  compose,
  getContext,
  mapProps,
  onlyUpdateForKeys,
  setDisplayName,
  withProps
} from 'recompose'

import Category, { CategoryItem } from './Category'
import Categories from './style'
import { afterMouseDown, parseData } from './utils'

export default compose<
  CategoriesProps & CategoriesOutterProps,
  CategoriesOutterProps
>(
  setDisplayName('categories'),
  getContext({ filter: func }),
  withProps<CategoriesProps, CategoriesOutterProps>(({ filter, data }) => ({
    data: parseData(data),
    afterMouseDown: afterMouseDown(filter)
  })),
  withSelections,
  onlyUpdateForKeys(['data']),
  mapProps(props => omit(props, ['filter', 'afterMouseDown']))
)(({ data = [], handleMouse, ...props }) => (
  <Module title="Category Filters" cta="New Filter">
    <Categories
      id="filters"
      onMouseDown={handleMouse}
      m={0}
      p={0}
      css={`
        list-style: none;
      `}
      {...props}>
      {orderBy(data, 'title').map(({ items, ...d }) => (
        <Category key={d.title} items={orderBy(items, 'title')} {...d} />
      ))}
    </Categories>
  </Module>
))

export interface CategoriesProps {
  data?: CategoryItem[]
  afterMouseDown?: () => void
}

export interface CategoriesOutterProps extends BoxProps, SelectionsProps {
  as?: any
  filter?: DataTableFilter
  data?: FakeResult[]
}
