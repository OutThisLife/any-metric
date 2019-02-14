import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import VirtualList from 'react-tiny-virtual-list'
import { BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'
import styled, { css } from 'styled-components'

import BaseText, { TextProps } from '../Text'

export default styled<any>(VirtualList)`
  ${({ theme }: BaphoTheme) => css`
    &.loading {
      opacity: 0.5;
    }

    a[href][id] {
      display: grid;
      grid-template-columns: 100px 150px 1fr 82.5px;
      align-items: stretch;
      justify-content: center;
      outline: 1px solid transparent;
      outline-offset: -1px;
      border-bottom: 1px solid ${rgba(theme.colours.border, 0.33)};
      transition: ${theme.eases.base};
      transition-delay: ${theme.eases.delay};
      background-color: rgba(0, 0, 0, 0);

      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: inherit;
        overflow: hidden;
        padding-left: var(--pad);
        padding-right: var(--pad);

        &:first-of-type {
          justify-content: flex-start;
        }

        &:last-of-type {
          justify-content: flex-end;
        }
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
