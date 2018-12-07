import { BaphoTheme } from '@/theme'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }: BaphoTheme) => css`
    grid-row: 1;
    padding-left: var(--pad);

    @media (max-width: 768px) {
      grid-column: 2 / 5;

      tbody tr & {
        grid-column-start: 3;
      }
    }

    > div {
      justify-content: flex-start;
      width: 100%;
    }

    a[href] {
      font-weight: 600;

      @media (min-width: 768px) {
        display: block;
        width: 100%;
        padding: calc(var(--pad) / 2) 0;
        padding-right: var(--pad);
      }

      svg {
        width: 13px;
        margin: 0 0 0 5px;
        color: ${theme.colours.label};

        @media (max-width: 768px) {
          display: none;
        }

        .row:not(:hover) & {
          transition: ${theme.eases.base};

          &:last-of-type {
            opacity: 0;
            transform: translate(8px, 0);
          }
        }
      }

      &:hover svg {
        fill: ${theme.colours.focus} !important;
      }
    }
  `}
`
