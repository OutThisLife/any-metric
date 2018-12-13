import Text from '@/components/Text'
import { dateAge, relTime } from '@/lib/utils'
import withTagColour, { TagColour } from '@/lib/withTagColour'
import { Tag } from '@/server/schema/types'
import { lighten, rgba } from 'polished'
import { MdClear } from 'react-icons/md'
import { compose, setDisplayName } from 'recompose'

import { CategoriesHandlers } from '.'

export default compose<CategoryItemProps & TagColour, CategoryItemProps>(
  setDisplayName('category-item'),
  withTagColour()
)(({ tagColours, isQuery, onDelete, onFilter, ...props }) => (
  <Text
    as="li"
    key={props._id}
    data-tag={props._id}
    className="row"
    css={`
      ${isQuery &&
        `
        grid-column: 1 / -1;
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
    <a href="javascript:;" tabIndex={-1} onClick={onFilter}>
      <label>{props.total}</label>
      <span>
        <span>{props.title}</span>

        <i className="delete" onClick={onDelete}>
          <MdClear size={10} />
        </i>
      </span>
    </a>

    {isQuery && (
      <time title={props.updatedAt.toString()}>
        <small>{relTime(props.updatedAt)}</small>
        <i className={dateAge(props.updatedAt)} />
      </time>
    )}
  </Text>
))

export interface CategoryItemProps extends Tag {
  onDelete?: () => CategoriesHandlers['handleDelete']
  onRefresh?: () => CategoriesHandlers['handleRefresh']
  onFilter?: CategoriesHandlers['handleFilter']
}
