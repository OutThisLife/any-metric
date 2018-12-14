import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import { bool } from 'prop-types'
import { Box, BoxProps } from 'rebass'
import { compose, setDisplayName, withContext } from 'recompose'
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

export const Container = styled<any>(Box as any)`
  ${({ theme }: BaphoTheme) => css`
    --border: ${rgba(theme.colours.border, 0.33)};

    user-select: none;
    display: grid;
    align-items: stretch;
    align-content: center;
    justify-content: center;
    border-left: 1px solid var(--border);

    thead,
    tbody,
    tfoot,
    tr {
      display: contents;
    }

    td,
    th {
      display: block;
      color: ${theme.colours.label};
    }

    th,
    td {
      padding-left: var(--pad);
      padding-right: var(--pad);

      &:first-of-type {
        justify-content: flex-start;
      }

      &:last-of-type {
        justify-content: flex-end;
      }
    }

    thead th {
      cursor: s-resize;
      z-index: 1;
      justify-content: center;
      position: sticky;
      top: 0;
      width: 100%;
      padding-bottom: var(--pad);
      text-transform: uppercase;
      border-bottom: 1px solid var(--border);
      background: ${rgba(theme.colours.panel, 0.95)};

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

    tbody tr {
      td {
        cursor: cell;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        outline: 1px solid transparent;
        outline-offset: -1px;
        background-color: rgba(0, 0, 0, 0);
        border-bottom: 1px solid var(--border);
        transition: ${theme.eases.base};
        transition-delay: ${theme.eases.delay};

        &:hover {
          outline-color: ${theme.colours.border};
          transition: none;
        }
      }

      &.hover td {
        transition: none;
        background-color: ${rgba(theme.colours.base, 0.01)};
      }

      &.chart-link td {
        outline-color: ${theme.colours.price.hl};
      }

      &.anim-in td {
        animation: ${animRowIn} ${theme.eases.base} forwards;
      }

      &.anim-out td {
        animation: ${animRowOut} ${theme.eases.base} forwards;
        transform-origin: center top;
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
  <Box
    as="tr"
    className="row"
    onMouseEnter={e => e.currentTarget.classList.add('hover')}
    onMouseLeave={e => e.currentTarget.classList.remove('hover')}
    {...props}
  />
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

export type Cell<T> = React.HTMLAttributes<T> &
  BoxProps & {
    onRef?: (ref?: T) => void
  }
