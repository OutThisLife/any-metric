import { ReactBox } from '@/components/Box'
import Text from '@/components/Text'
import { BaphoTheme } from '@/theme'
import { Table as BaseTable } from 'evergreen-ui'
import omit from 'lodash/omit'
import { rgba } from 'polished'
import { compose, defaultProps, mapProps } from 'recompose'
import styled, { css, withTheme } from 'styled-components'

const enhance = (...funcs: any[]) =>
  compose<ITable & BaphoTheme, ITable>(
    defaultProps({
      marginX: 0,
      marginY: 0,
      paddingX: 0,
      paddingY: 0,
      borderBottom: '0px'
    }),
    mapProps(props => omit(props, ['isHeader', 'theme'])),
    ...funcs
  )

const Table = styled<any>(BaseTable)`
  ${({ theme }: BaphoTheme) => css`
    .head,
    .row {
      padding: 0 var(--pad);
    }

    .head {
      padding-right: calc(var(--pad) * 2);
    }

    .row {
      user-select: none;
      outline-offset: -4px;
      outline: 2px solid transparent;

      &:not(:hover) {
        transition: ${theme.eases.base};
      }

      &:hover {
        outline-color: ${rgba(theme.colours.focus, 0.1)};
        background: ${rgba(theme.colours.base, 0.01)};
      }

      &[data-checked='true'] {
        outline-color: ${theme.colours.focus};
        background: #1a213f;
      }
    }

    [data-evergreen-table-body] > div {
      padding-right: var(--pad);
    }

    .dragging a {
      pointer-events: none !important;
    }
  `}
` as ITable<BaphoTheme> & ReactBox<BaphoTheme, HTMLTableElement>

// ---------------------------

Table.Head = enhance()(props => <BaseTable.Head background="none" {...props} />)

Table.Body = enhance()(props => (
  <BaseTable.VirtualBody allowAutoHeight {...props} />
))

Table.Row = enhance()(props => (
  <BaseTable.Row className="row" height="auto" {...props} />
))

Table.Cell = enhance()(props => <BaseTable.Cell className="cell" {...props} />)

Table.HeaderCell = enhance(withTheme)(({ theme, children, ...props }) => (
  <BaseTable.HeaderCell {...props}>
    <Table.Text color={theme.colours.label}>{children}</Table.Text>
  </BaseTable.HeaderCell>
))

Table.Text = enhance()(props => (
  <Text
    display="inline-block"
    width="100%"
    fontWeight={300}
    fontSize="0.9rem"
    textAlign="inherit"
    {...props}
  />
))

// ---------------------------

export interface ITable<P = {}> {
  Head?: ReactBox<P, HTMLTableElement>
  HeaderCell?: ReactBox<P, HTMLTableHeaderCellElement>
  Body?: ReactBox<P, HTMLTableElement>
  Row?: ReactBox<P, HTMLTableRowElement>
  Cell?: ReactBox<P, HTMLTableCellElement>
  Text?: ReactBox<P, HTMLTableCellElement>
}

export default Table
