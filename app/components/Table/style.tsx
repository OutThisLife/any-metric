import { ReactBox } from '@/components/Box'
import { BaphoTheme } from '@/theme'
import { Table } from 'evergreen-ui'
import { rgba } from 'polished'
import styled, { css } from 'styled-components'

import { ITable } from './Elements'

export default styled<any>(Table)`
  ${({ theme }: BaphoTheme) => css`
    .head {
      user-select: none;

      > div * {
        cursor: pointer;
      }

      > div > span > {
        span:not(:only-child) {
          color: ${theme.colours.muted};
        }

        svg {
          fill: ${theme.colours.muted} !important;
        }
      }
    }

    @media (max-width: 1025px) {
      .head {
        display: none;
      }

      .row {
        min-width: 1024px;
      }
    }

    .row {
      user-select: none;
      outline-offset: -3px;
      outline: 1px solid transparent;

      &:not(:hover) {
        transition: ${theme.eases.base};
        transition-property: background, outline;
      }

      &:hover {
        outline-color: ${rgba(theme.colours.border, 0.4)};
        background: ${rgba(theme.colours.base, 0.01)};
      }

      &[data-checked] {
        outline-color: ${theme.colours.focus};
      }

      &.chart-link {
        outline-color: ${theme.colours.price.hl};
      }
    }
  `}
` as ITable<{}> & ReactBox<{}, HTMLTableElement>
