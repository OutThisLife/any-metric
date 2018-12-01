import { BoxProps } from '@/components/Box'
import Text from '@/components/Text'
import { DataTableFilter } from '@/pages/Dashboard'
import { BaphoTheme } from '@/theme'
import { func } from 'prop-types'
import { compose, getContext, setDisplayName, withHandlers } from 'recompose'
import { withTheme } from 'styled-components'

import { CategoriesProps } from '..'
import Category from './style'

export default compose<CategoryProps & CategoryHandlers, CategoryOutterProps>(
  setDisplayName('category'),
  getContext({ filter: func }),
  withTheme,
  withHandlers<CategoryProps, CategoryHandlers>(() => ({
    handleClick: ({ title, filter }) => ({ target }) => {
      if (!(target instanceof HTMLElement)) {
        return
      }

      const $checked = target.offsetParent.querySelectorAll('[data-checked]')

      if (!$checked.length) {
        filter({
          value: '',
          action: 'RESET'
        })

        return
      }

      window.requestAnimationFrame(() => {
        const value = [].slice
          .call($checked)
          .reduce((acc, el) => acc.push(el.dataset.tag) && acc, [title])
          .join(',')

        filter({
          value,
          action: 'TAG'
        })
      })
    }
  }))
)(({ theme, handleClick, title: groupTitle, total: maxItems, items = [] }) => (
  <Category>
    <Text is="a" href="javascript:;" display="flex" alignItems="center">
      <Text fontSize="0.9rem" color={theme.colours.base}>
        {groupTitle}
      </Text>

      <Text
        is="span"
        display="inline-block"
        fontSize="0.9em"
        lineHeight={1}
        margin={0}
        paddingX={5}
        color={theme.colours.label}
        style={{ verticalAlign: 'middle' }}>
        ({maxItems})
      </Text>
    </Text>

    <Category.Children>
      {items.map(({ title, total }) => (
        <li key={title} className="row" data-tag={title}>
          <a href="javascript:;" onClick={handleClick}>
            {title} ({total})
          </a>
        </li>
      ))}
    </Category.Children>
  </Category>
))

export type CategoryOutterProps = BoxProps<HTMLLIElement> &
  CategoriesProps['data'][keyof CategoriesProps['data']]

export type CategoryProps = CategoryOutterProps &
  BaphoTheme &
  CategoryItem & {
    filter: DataTableFilter
  }

export interface CategoryHandlers {
  handleClick: React.MouseEventHandler<HTMLElement>
}

export interface CategoryItem {
  title: string
  total: number
  items?: CategoryItem[]
}
