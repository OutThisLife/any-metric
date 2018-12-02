import Module from '@/components/Module'
import withSelections, { SelectionsProps } from '@/lib/withSelections'
import { FakeResult } from '@/server/schema/types'
import { BoxProps } from 'rebass'
import {
  compose,
  onlyUpdateForKeys,
  setDisplayName,
  withProps
} from 'recompose'

import Category, { CategoryItem } from './Category'
import Categories from './style'

export default compose<
  CategoriesProps & CategoriesOutterProps,
  CategoriesOutterProps
>(
  setDisplayName('categories'),
  withSelections,
  withProps<CategoriesProps, CategoriesOutterProps>(({ data }) => {
    data = data.filter(d => d.tags.length)

    return {
      data: data
        .map(d => d.tags[0])
        .filter((t, i, s) => s.indexOf(t) === i)
        .map(title => {
          const rel = data.filter(d => d.tags.includes(title)) || []

          return {
            title,
            total: rel.length,
            items: rel.reduce(
              (acc, { tags }) =>
                tags.map(
                  t =>
                    !(acc.find(a => a.title === t) || t === title) &&
                    acc.push({
                      title: t,
                      total: (rel.filter(d => d.tags.includes(t)) || []).length
                    })
                ) && acc,
              []
            )
          }
        })
    }
  }),
  onlyUpdateForKeys(['data'])
)(({ data = [], handleMouse, ...props }) => (
  <Module title="Category Filters" cta="New Filter">
    <Categories
      m={0}
      p={0}
      css={`
        list-style: none;
      `}
      onMouseDown={handleMouse}
      {...props}>
      {data.map(d => (
        <Category key={d.title} {...d} />
      ))}
    </Categories>
  </Module>
))

export interface CategoriesProps {
  data: CategoryItem[]
}

export interface CategoriesOutterProps extends BoxProps, SelectionsProps {
  as?: any
  data?: FakeResult[]
}
