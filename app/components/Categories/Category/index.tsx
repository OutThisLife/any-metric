import Text from '@/components/Text'
import { DataTableFilter } from '@/pages/Dashboard'
import { BaphoTheme } from '@/theme'
import { func } from 'prop-types'
import { Box, BoxProps } from 'rebass'
import { compose, getContext, setDisplayName, withHandlers } from 'recompose'
import { withTheme } from 'styled-components'

import { CategoriesProps } from '..'

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
  <Box
    as="li"
    css={`
      position: relative;
      outline: 1px solid transparent;
      border: 1px solid ${theme.colours.border};
      transition: outline-color ${theme.eases.base};
      background: transparent;

      &:hover {
        z-index: 1;
        outline-color: ${theme.colours.focus};
      }

      > a[href] {
        display: flex;
        align-items: center;

        + span {
          display: inline-block;
        }
      }
    `}>
    {console.log(theme.colours.secondary)}
    <Text as="a" href="javascript:;">
      <Text fontSize={11} color={theme.colours.base}>
        {groupTitle}
      </Text>

      <Text fontSize={11} lineHeight={1} color={theme.colours.label} pl={1}>
        ({maxItems})
      </Text>
    </Text>

    <Box as="ul">
      {items.map(({ title, total }) => (
        <li key={title} className="row" data-tag={title}>
          <a href="javascript:;" onClick={handleClick}>
            {title} ({total})
          </a>
        </li>
      ))}
    </Box>
  </Box>
))

export type CategoryOutterProps = BoxProps &
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
