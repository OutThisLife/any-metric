import Text from '@/components/Text'
import { Box, BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { CategoriesProps } from '.'

export default compose<CategoryProps, CategoryOutterProps>(
  setDisplayName('category')
)(({ title: groupTitle, total: maxItems, items = [] }) => (
  <Box as="li" className="row-parent" data-tag={groupTitle}>
    <a
      href="javascript:;"
      className="row"
      style={{
        zIndex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }}
    />

    <Text as="h5" m={0} p={0}>
      {groupTitle}

      <Text lineHeight={1} pl={1}>
        ({maxItems})
      </Text>
    </Text>

    <Box as="ul">
      {items.map(({ title, total }) => (
        <li key={title} className="row" data-tag={title}>
          <a href="javascript:;" style={{ zIndex: 2, position: 'relative' }}>
            {title} ({total})
          </a>
        </li>
      ))}
    </Box>
  </Box>
))

export type CategoryOutterProps = BoxProps &
  CategoriesProps['data'][keyof CategoriesProps['data']]

export type CategoryProps = CategoryOutterProps & CategoryItem

export interface CategoryItem {
  title: string
  total: number
  items?: CategoryItem[]
}
