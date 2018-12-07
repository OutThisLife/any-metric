import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import { bool } from 'prop-types'
import { Box, BoxProps } from 'rebass'
import { compose, setDisplayName, withContext } from 'recompose'
import styled, { css } from 'styled-components'

import BaseText, { TextProps } from '../Text'

export const Container = styled<any>(Box as any)`
  user-select: none;
  display: block;
  width: 100%;
  height: 100%;

  thead,
  tbody,
  tfoot,
  th,
  tr,
  td {
    display: block;
  }

  ${({ theme }: BaphoTheme) => css`
    tr {
      align-items: stretch;
      padding: 0 calc(var(--pad) - 10px);
      border-bottom: 1px solid ${rgba(theme.colours.border, 0.5)};

      @media (max-width: 1025px) {
        padding: 0 calc(var(--pad) * 2);
      }

      > * {
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${theme.colours.label};

        &:first-child {
          justify-content: flex-start;
        }

        &:last-child {
          justify-content: flex-end;
          text-align: right;
        }
      }
    }

    .head {
      z-index: 1;
      position: sticky;
      top: 0;
      background: ${rgba(theme.colours.panel, 0.95)};

      th {
        cursor: s-resize;
        color: ${theme.colours.label};
        text-transform: uppercase;
        padding-bottom: 1rem;

        @media (max-width: 1025px) {
          padding-top: 1rem;
        }

        &[data-sorted='true'] {
          color: ${theme.colours.secondary};

          h5 {
            color: inherit;
          }
        }

        h5 {
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 1px;
          margin: 0;
        }

        svg {
          width: 10px;
        }
      }
    }

    tbody tr {
      user-select: none;
      outline: 1px solid transparent;
      outline-offset: -2px;
      background-color: rgba(0, 0, 0, 0);
      transition: ${theme.eases.base};

      &:hover {
        transition: none;
        background-color: ${rgba(theme.colours.base, 0.01)};
      }

      &[data-checked] {
        outline-color: ${theme.colours.focus};
      }

      &.chart-link {
        outline-color: ${theme.colours.price.hl};
      }
    }
  `}
`

export const Body = compose<
  Cell<HTMLTableSectionElement>,
  Cell<HTMLTableSectionElement>
>(setDisplayName('table-tbody'))(props => <Box as="tbody" {...props} />)

export const Row = compose<
  Cell<HTMLTableRowElement>,
  Cell<HTMLTableRowElement>
>(setDisplayName('table-tr'))(props => (
  <Box as="tr" className="row" {...props} />
))

export const Cell = compose<
  Cell<HTMLTableCellElement>,
  Cell<HTMLTableCellElement>
>(setDisplayName('table-td'))(props => (
  <Box as="td" className="cell" {...props} />
))

export const Head = compose(
  setDisplayName('table-thead'),
  withContext({ isHeader: bool }, () => ({ isHeader: true }))
)(({ children }) => (
  <Box as="thead" className="head">
    <Row>{children}</Row>
  </Box>
))

export const Foot = compose(setDisplayName('table-tfoot'))(({ children }) => (
  <Box as="tfoot" className="foot">
    <Row>{children}</Row>
  </Box>
))

export const HeaderCell = compose<
  Cell<HTMLTableHeaderCellElement> & BaphoTheme,
  Cell<HTMLTableHeaderCellElement>
>(setDisplayName('table-th'))(props => <Box as="th" {...props} />)

export const Text = compose<Cell<HTMLParagraphElement>, TextProps>(
  setDisplayName('table-text')
)(BaseText)

export type Cell<T> = React.HTMLAttributes<T> & BoxProps
