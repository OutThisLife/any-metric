import Text from '@/components/Text'
import { CategoryItem } from '@/lib/utils'
import withTagColour, { TagColour } from '@/lib/withTagColour'
import { MdClear } from 'react-icons/md'
import { compose, setDisplayName } from 'recompose'

import { CategoriesHandlers } from '.'

export default compose<CategoryItemProps & TagColour, CategoryItemProps>(
  setDisplayName('category-item'),
  withTagColour()
)(({ tagColours, title, total, delTag }) => (
  <Text
    as="li"
    key={title}
    className="row"
    data-tag={title}
    css={`
      a[href] {
        color: ${tagColours.colour};

        label {
          color: ${tagColours.colour};
          background: ${tagColours.bg};
        }
      }

      &[data-checked] a[href] {
        background: ${tagColours.bg};

        label {
          color: ${({ theme }) => theme.colours.base} !important;
        }
      }
    `}>
    <a href="javascript:;">
      <label>{total}</label>
      <span>
        <span>{title}</span>
        <i className="delete" onClick={() => delTag(title)}>
          <MdClear size={10} />
        </i>
      </span>
    </a>
  </Text>
))

export interface CategoryItemProps extends CategoryItem {
  delTag: CategoriesHandlers['delTag']
}
