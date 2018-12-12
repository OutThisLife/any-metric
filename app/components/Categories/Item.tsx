import Text from '@/components/Text'
import { dateAge, relTime } from '@/lib/utils'
import withTagColour, { TagColour } from '@/lib/withTagColour'
import { Tag } from '@/server/schema/types'
import { lighten, rgba } from 'polished'
import { IoMdRefresh } from 'react-icons/io'
import { MdClear } from 'react-icons/md'
import { compose, setDisplayName } from 'recompose'

export default compose<CategoryItemProps & TagColour, CategoryItemProps>(
  setDisplayName('category-item'),
  withTagColour()
)(({ tagColours, onDelete, isQuery, ...props }) => (
  <Text
    as="li"
    key={props._id}
    className="row"
    data-tag={props.slug}
    css={`
      ${isQuery &&
        `grid-column: 1 / -1;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        `};

      a[href] {
        color: ${tagColours.colour};

        &:hover {
          color: ${tagColours.colour};
          outline-color: ${rgba(tagColours.border, 0.5)};
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
      <label>{props.total}</label>
      <span>
        <span>{props.title}</span>

        {typeof onDelete === 'function' && (
          <i className="delete" onClick={onDelete}>
            <MdClear size={10} />
          </i>
        )}
      </span>
    </a>

    {isQuery && (
      <time>
        <small>{relTime(props.updatedAt)}</small>
        <IoMdRefresh />
        <i className={dateAge(props.updatedAt)} />
      </time>
    )}
  </Text>
))

export interface CategoryItemProps extends Tag {
  onDelete?: () => void
}
