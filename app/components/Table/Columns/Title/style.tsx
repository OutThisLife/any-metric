import { BaphoTheme } from '@/theme'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }: BaphoTheme) => css`
    padding-left: var(--pad);

    > div {
      justify-content: flex-start;
      width: 100%;
    }

    a[href] {
      display: block;
      width: 100%;
      font-weight: 600;
      padding: calc(var(--pad) / 2) 0;
      padding-right: var(--pad);

      svg {
        width: 13px;
        margin: 0 0 0 5px;
        color: ${theme.colours.label};

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
