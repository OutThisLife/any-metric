import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import VirtualList from 'react-tiny-virtual-list'
import { BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'
import styled, { css } from 'styled-components'

import BaseText, { TextProps } from '../Text'

export default styled<any>(VirtualList)`
  ${({ theme }: BaphoTheme) => css`
    will-change: unset !important;

    &.loading {
      opacity: 0.5;
    }

    article {
      cursor: cell;
      user-select: none;
      display: grid;
      grid-template-columns: 100px 80px 1fr 150px 200px;
      align-items: stretch;
      justify-content: center;
      outline: 1px solid transparent;
      outline-offset: -1px;
      border-bottom: 1px solid ${rgba(theme.colours.border, 0.33)};
      transition: ${theme.eases.base};
      transition-delay: ${theme.eases.delay};
      background-color: rgba(0, 0, 0, 0);

      &:hover {
        outline-color: ${theme.colours.border};
        transition: none;
        background-color: ${rgba(theme.colours.base, 0.01)};
      }

      > div {
        position: relative;

        &:first-child,
        &:last-child {
          &:before {
            z-index: 1;
            content: '';
            position: absolute;
            top: 0;
            bottom: -1px;
            width: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              ${theme.colours.panel} 80%
            );
          }

          &:first-child:before {
            left: 0;
            transform: scaleX(-1);
          }

          &:last-child:before {
            right: 0;
          }

          > * {
            z-index: 2;
            position: relative;
          }
        }
      }

      @media (max-width: 1500px) {
        grid-template-rows: 1fr var(--pad) max-content var(--pad);
        grid-template-columns: 100px 80px 1fr 100px auto;

        [name] {
          grid-row: 1;
        }

        [name='title'] {
          grid-column: 3 / -1;
        }

        [name='createdAt'] {
          grid-row: 3;
          grid-column: 2 / -1;
          padding: 0;

          > div {
            align-self: flex-start;
            text-align: left;
          }
        }

        [name='tags'] {
          grid-row: 3;
          grid-column: 3 / -1;
        }
      }

      @media (max-width: 1024px) {
        grid-template-columns: 80px 15vw 1fr 100px auto;

        [name='title'],
        [name='tags'] {
          grid-column: 3 / -1;
        }
      }

      > div {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        color: ${theme.colours.label};
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
