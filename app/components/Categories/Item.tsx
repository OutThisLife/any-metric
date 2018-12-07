import Text from '@/components/Text'
import { CategoryItem } from '@/lib/utils'
import withTagColour, { TagColour } from '@/lib/withTagColour'
import { compose, setDisplayName } from 'recompose'

export default compose<CategoryItem & TagColour, CategoryItem>(
  setDisplayName('category-item'),
  withTagColour()
)(({ children, tagColours, title, total }) => (
  <Text
    as="a"
    key={title}
    href="javascript:;"
    className="row"
    data-tag={title}
    css={`
      &[href] {
        color: ${tagColours.colour};
      }

      label {
        color: ${tagColours.colour};
        background: ${tagColours.bg};
      }

      &[data-checked] {
        background: ${tagColours.bg};

        label {
          color: ${({ theme }) => theme.colours.base} !important;
        }
      }
    `}>
    <label dangerouslySetInnerHTML={{ __html: total.toString() }} />
    <span dangerouslySetInnerHTML={{ __html: title }} />
    {children}
  </Text>
))
