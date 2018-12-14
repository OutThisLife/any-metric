import { TagColour } from '@/lib/withTagColour'
import { lighten, rgba } from 'polished'
import styled, { css } from 'styled-components'

import Text from '../Text'
import { CategoryItemProps } from './Item'

export default styled<any>(Text).attrs(({ isQuery }: CategoryItemProps) => {
  const style: React.CSSProperties = {}

  if (isQuery) {
    style.gridColumn = '1 / -1'
    style.display = 'grid'
    style.gridTemplateColumns = 'repeat(2,1fr)'
  }
  return { style }
})`
  ${({ tagColours }: CategoryItemProps & TagColour) => css`
    &.loading {
      pointer-events: none;
      cursor: wait;

      a[href] {
        filter: grayscale(0.7) blur(0.5px);
      }
    }

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
  `}
`
