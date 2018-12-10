import Text from '@/components/Text'
import { CategoryItem } from '@/lib/utils'
import withTagColour, { TagColour } from '@/lib/withTagColour'
import { lighten, rgba } from 'polished'
import { MdClear } from 'react-icons/md'
import { compose, setDisplayName } from 'recompose'

export default compose<CategoryItemProps & TagColour, CategoryItemProps>(
  setDisplayName('category-item'),
  withTagColour()
)(({ tagColours, title, total, handleDelete }) => (
  <Text
    as="li"
    key={title}
    className="row"
    data-tag={title}
    css={`
      a[href] {
        color: ${tagColours.colour};

        &:hover {
          color: ${tagColours.colour};
          outline-color: ${rgba(tagColours.border, 0.5)};
          transition: none;
        }

        label {
          color: ${tagColours.colour};
          background: ${tagColours.bg};
        }
      }

      &[data-checked] a[href] {
        color: ${lighten(0.5, tagColours.colour)};
        background: ${tagColours.bg};

        label {
          color: ${tagColours.colour};
        }
      }
    `}>
    <a href="javascript:;" tabIndex={-1}>
      <label>{total}</label>
      <span>
        <span>{title}</span>
        <i
          className="delete"
          onClick={() =>
            window.confirm(
              'Are you sure you want to delete this tag? All references will be removed.'
            ) && handleDelete()
          }>
          <MdClear size={10} />
        </i>
      </span>
    </a>
  </Text>
))

export interface CategoryItemProps extends CategoryItem {
  handleDelete: () => void
}
