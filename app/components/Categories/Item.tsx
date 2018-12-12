import Text from '@/components/Text'
import withTagColour, { TagColour } from '@/lib/withTagColour'
import { Tag } from '@/server/schema/types'
import { lighten, rgba } from 'polished'
import { MdClear } from 'react-icons/md'
import { compose, setDisplayName } from 'recompose'

export default compose<CategoryItemProps & TagColour, CategoryItemProps>(
  setDisplayName('category-item'),
  withTagColour()
)(({ tagColours, title: t, total, onDelete }) => (
  <Text
    as="li"
    key={t}
    className="row"
    data-tag={t}
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
        <span>{t}</span>

        {typeof onDelete === 'function' && (
          <i className="delete" onClick={onDelete}>
            <MdClear size={10} />
          </i>
        )}
      </span>
    </a>
  </Text>
))

export interface CategoryItemProps extends Tag {
  onDelete?: () => void
}
