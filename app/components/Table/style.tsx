import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import VirtualList from 'react-tiny-virtual-list'
import { BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'
import styled, { css, keyframes } from 'styled-components'

import BaseText, { TextProps } from '../Text'

const animRowIn = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, -1rem, 0);
}

to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`

const animRowOut = keyframes`
to {
  opacity: 0;
  transform: scale(0.9) translate3d(-10px, 0, 0);
}
`

export default styled<any>(VirtualList)`
  ${({ theme }: BaphoTheme) => css`
    will-change: unset !important;

    &.loading {
      opacity: 0.5;
    }

    .scrolling article {
      pointer-events: none !important;
    }

    article {
      user-select: none;
      display: grid;
      align-items: stretch;
      justify-content: center;

      > div {
        cursor: cell;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        color: ${theme.colours.label};
        padding-left: var(--pad);
        padding-right: var(--pad);
        outline: 1px solid transparent;
        outline-offset: -1px;
        border-bottom: 1px solid ${rgba(theme.colours.border, 0.33)};
        transition: ${theme.eases.base};
        transition-delay: ${theme.eases.delay};
        background-color: rgba(0, 0, 0, 0);

        &:first-of-type {
          justify-content: flex-start;
        }

        &:last-of-type {
          justify-content: flex-end;
        }

        &:hover {
          outline-color: ${theme.colours.border};
          transition: none;
        }
      }

      &:hover > div {
        transition: none;
        background-color: ${rgba(theme.colours.base, 0.01)};
      }

      &.chart-link > div {
        outline-color: ${theme.colours.price.hl};
      }

      &.anim-in > div {
        animation: ${animRowIn} ${theme.eases.base} forwards;
      }

      &.anim-out > div {
        animation: ${animRowOut} ${theme.eases.base} forwards;
        transform-origin: center top;
      }
    }
  `}
`

export const Text = compose<Cell<HTMLParagraphElement>, TextProps>(
  setDisplayName('table-text')
)(BaseText)

export type Cell<T> = React.HTMLAttributes<T> &
  BoxProps & {
    onRef?: (ref?: T) => void
  }
