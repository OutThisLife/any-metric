import { BaphoTheme } from '@/theme'
import styled, { css } from 'styled-components'

import Text from '../Text'
import { CategoryItemProps } from './Item'

export default styled<any>(Text)`
  ${({ theme }: CategoryItemProps & BaphoTheme) => css`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    padding: 0.5em;

    &:hover {
      background: ${theme.colours.module};
    }

    &[data-checked] {
      background: ${theme.colours.focus};

      span {
        text-decoration: underline;
      }
    }

    a[href] {
      flex: 1;
      display: inherit;
      align-items: inherit;

      &:hover {
        text-decoration: none;

        span {
          text-decoration: underline;
        }
      }

      em {
        margin-left: 1px;
      }
    }

    i,
    em {
      color: ${theme.colours.label};
      font-size: 0.85rem;
      vertical-align: middle;
      line-height: 0;
    }

    i {
      font-style: normal;
    }

    &:not(:hover) i {
      visibility: hidden;
    }

    &.loading {
      pointer-events: none;
      opacity: 0.5;
    }
  `}
`
