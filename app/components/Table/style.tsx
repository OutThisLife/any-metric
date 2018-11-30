import { ReactBox } from '@/components/Box'
import { BaphoTheme } from '@/theme'
import { Table as BaseTable } from 'evergreen-ui'
import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled<any>(BaseTable)`
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

    .row {
      user-select: none;
      outline-offset: -4px;
      outline: 2px solid transparent;

      &:not(:hover) {
        transition: ${theme.eases.base};
        transition-property: background, outline;
      }

      &:hover {
        outline-color: ${rgba(theme.colours.focus, 0.1)};
        background: ${rgba(theme.colours.base, 0.01)};
      }

      &[data-checked] {
        outline-color: ${theme.colours.focus};
        background: #1a213f;
      }

      &.chart-link {
        outline-color: ${theme.colours.star};
      }
    }
  `}
` as ITable<{}> & ReactBox<{}, HTMLTableElement>

export interface ITable<P = {}> {
  Head?: ReactBox<P, HTMLTableElement>
  HeaderCell?: ReactBox<P, HTMLTableHeaderCellElement>
  Body?: ReactBox<P, HTMLTableElement>
  Row?: ReactBox<P, HTMLTableRowElement>
  Cell?: ReactBox<P, HTMLTableCellElement>
  Text?: ReactBox<P, HTMLTableCellElement>
}
