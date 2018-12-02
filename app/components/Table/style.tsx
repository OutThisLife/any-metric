import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import { bool } from 'prop-types'
import { Box, BoxProps } from 'rebass'
import { compose, setDisplayName, withContext } from 'recompose'
import styled, { css, withTheme } from 'styled-components'

import BaseText, { TextProps } from '../Text'

export const Container = styled<any>(Box)`
  position: relative;
  width: 100%;
  table-layout: fixed;

  ${({ theme }: BaphoTheme) => css`
    .head {
      user-select: none;
    }

    @media (max-width: 1025px) {
      .head {
        display: none;
      }

      .row {
        min-width: 1024px;
      }
    }

    tbody .row {
      user-select: none;
      outline-offset: -3px;
      outline: 1px solid transparent;

      .cell {
        position: relative;
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

export const HeaderCell = compose<
  Cell<HTMLTableHeaderCellElement> & BaphoTheme,
  Cell<HTMLTableHeaderCellElement>
>(
  setDisplayName('table-th'),
  withTheme
)(({ theme, children, ...props }) => (
  <Box as="th" {...props}>
    <Text
      css="display: flex; alignItems: center; width: 100%"
      fontSize={10}
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
