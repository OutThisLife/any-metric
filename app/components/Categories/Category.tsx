import Text from '@/components/Text'
import { CategoryItem } from '@/lib/utils'
import { Box, BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { CategoriesProps } from '.'

export default compose<CategoryProps, CategoryOutterProps>(
  setDisplayName('category')
)(({ title: groupTitle, total: maxItems, items = [] }) => (
  <Box as="li" className="row parent" data-tag={groupTitle}>
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
  CategoriesProps['tags'][keyof CategoriesProps['tags']]

export type CategoryProps = CategoryOutterProps & CategoryItem
