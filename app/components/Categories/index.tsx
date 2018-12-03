import Module from '@/components/Module'
import withSelections, { SelectionsProps } from '@/lib/withSelections'
import { DataTableFilter } from '@/pages/Dashboard'
import { FakeResult } from '@/server/schema/types'
import { orderBy } from 'lodash'
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

export default compose<
  CategoriesProps & CategoriesOutterProps,
  CategoriesOutterProps
>(
  setDisplayName('categories'),
  getContext({ filter: func }),
  withProps<CategoriesProps, CategoriesOutterProps>(
    ({ filter, data: initialData }) => {
      const data = initialData
        .filter(d => d.tags.length)
        .map(d => d.tags[0])
        .filter((t, i, s) => s.indexOf(t) === i)
        .map(title => {
          const rel =
            initialData.filter(d => d.tags.length && d.tags.includes(title)) ||
            []

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

      const afterMouseDown = () => {
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

      return { data, afterMouseDown }
    }
  ),
  withSelections,
  onlyUpdateForKeys(['data']),
  mapProps(({ filter, ...props }) => props)
)(({ data = [], handleMouse, ...props }) => (
  <Module title="Category Filters" cta="New Filter">
    <Categories
      id="filters"
      m={0}
      p={0}
      css={`
        list-style: none;
      `}
      onMouseDown={handleMouse}
      {...props}>
      {orderBy(data, 'title').map(({ items, ...d }) => (
        <Category key={d.title} {...d} items={orderBy(items, 'title')} />
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
