import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import { bool } from 'prop-types'
import { Box, BoxProps } from 'rebass'
import { compose, setDisplayName, withContext } from 'recompose'
import styled, { css, withTheme } from 'styled-components'

import BaseText, { TextProps } from '../Text'

export const Container = styled<any>(Box as any)`
  table-layout: fixed;
  border-collapse: collapse;
  position: relative;
  width: 100%;
  height: 100%;

  tr,
  td {
    border: 0;
  }

  tr {
    td > span,
    th > span {
      display: flex;
      align-items: center;
      justify-content: center;

      > span {
        display: block;
      }
    }

    td > span {
      flex-wrap: wrap;

      > span {
        width: 100%;
      }
    }

    th > span {
      flex-wrap: nowrap;
    }

    > *:first-of-type > span {
      justify-content: left;
      text-align: left;
    }

    > *:last-of-type > span {
      justify-content: right;
      text-align: right;
    }
  }

  @media (max-width: 1025px) {
    thead {
      display: none;
    }

    tr {
      min-width: 1024px;
    }
  }

  @media (min-width: 768px) {
    padding-right: calc(var(--pad) / 2);

    tr > *:last-child {
      padding-right: calc(var(--pad) / 2);
    }
  }

  ${({ theme }: BaphoTheme) => css`
    .head {
      user-select: none;

      th {
        z-index: 1;
        position: sticky;
        top: 0;
        font-size: initial;
        padding-bottom: 1rem;
        background: ${theme.colours.panel};

        svg {
          width: 10px;
        }
      }
    }

    tbody .row {
      user-select: none;
      outline-offset: -2px;
      outline: 1px solid transparent;

      td {
        position: relative;
        vertical-align: middle;
        color: ${theme.colours.label};
        border-bottom: 1px solid ${rgba(theme.colours.border, 0.5)};
      }

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

    tfoot td {
      opacity: 0.2;
      z-index: 10;
      position: sticky;
      bottom: 0;
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
>(
  setDisplayName('table-th'),
  withTheme
)(({ theme, children, ...props }) => (
  <Box as="th" {...props}>
    <Text
      css={`
        display: flex;
        alignitems: center;
        width: 100%;
      `}
      fontWeight="300"
      color={theme.colours.label}>
      {children}
    </Text>
  </Box>
))

export const Text = compose<Cell<HTMLParagraphElement>, TextProps>(
  setDisplayName('table-text')
)(BaseText)

export type Cell<T> = React.HTMLAttributes<T> & BoxProps
