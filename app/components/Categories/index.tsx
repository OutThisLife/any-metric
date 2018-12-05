import Module from '@/components/Module'
import { getTags } from '@/lib/queries'
import { CategoryItem } from '@/lib/utils'
import withSelections, { SelectionsProps } from '@/lib/withSelections'
import { DataTableFilter } from '@/pages/Dashboard'
import { FakeResult } from '@/server/schema/types'
import { omit } from 'lodash'
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

import Category from './Category'
import Categories from './style'

export default compose<
  CategoriesProps & CategoriesOutterProps,
  CategoriesOutterProps
>(
  setDisplayName('categories'),
  getContext({ filter: func }),
  getTags(),
  withProps<CategoriesProps, CategoriesOutterProps>(({ filter }) => ({
    afterMouseDown: () => {
      const $checked = document.querySelectorAll(
        '#filters [data-tag][data-checked]'
      )

      if (!$checked.length) {
        return filter({
          value: '',
          action: 'RESET'
        })
      }

      filter({
        action: 'TAG',
        value: [].slice
          .call($checked)
          .reduce((acc, el: HTMLElement) => {
            const $ul = el.offsetParent

            if ($ul instanceof HTMLLIElement) {
              const { tag } = $ul.dataset
              acc.push([tag, el.dataset.tag])
            } else {
              acc.push([el.dataset.tag])
            }

            return acc
          }, [])
          .join(';')
      })
    }
  })),
  withSelections,
  onlyUpdateForKeys(['data']),
  mapProps(props => omit(props, ['filter', 'afterMouseDown']))
)(({ tags = [], handleMouse, ...props }) => (
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
      {tags.map(d => (
        <Category key={d.title} {...d} />
      ))}
    </Categories>
  </Module>
))

export interface CategoriesProps {
  tags?: CategoryItem[]
  afterMouseDown?: () => void
}

export interface CategoriesOutterProps extends BoxProps, SelectionsProps {
  as?: any
  filter?: DataTableFilter
  data?: FakeResult[]
}
