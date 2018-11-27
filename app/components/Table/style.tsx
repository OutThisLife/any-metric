import { BoxProps, ReactBox } from '@/components/Box'
import Text from '@/components/Text'
import { BaphoTheme } from '@/theme'
import { Table as BaseTable } from 'evergreen-ui'
import omit from 'lodash/omit'
import { rgba } from 'polished'
import { compose, defaultProps, mapProps, withProps } from 'recompose'
import styled, { css, withTheme } from 'styled-components'

const enhance = <T extends {}>(...funcs: any[]) =>
  compose<ITable & T, ITable>(
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
      user-select: none;
      padding-right: calc(var(--pad) * 2);

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
      }

      &:hover {
        outline-color: ${rgba(theme.colours.focus, 0.1)};
        background: ${rgba(theme.colours.base, 0.01)};
      }

      &[data-checked] {
        outline-color: ${theme.colours.focus};
        background: #1a213f;
      }
    }

    [data-evergreen-table-body] > div {
      padding-right: var(--pad);
    }
  `}
` as ITable<{}> & ReactBox<{}, HTMLTableElement>

// ---------------------------

Table.Head = enhance(
  withProps({
    background: 'none'
  })
)(BaseTable.Head)

Table.Body = enhance(withProps({ allowAutoHeight: true }))(
  BaseTable.VirtualBody
)

Table.Row = enhance(
  withProps({
    className: 'row',
    height: 'auto'
  })
)(BaseTable.Row)

Table.Cell = enhance(withProps({ className: 'cell' }))(BaseTable.Cell)

Table.HeaderCell = enhance<BaphoTheme>(withTheme)(
  ({ theme, children, ...props }) => (
    <BaseTable.HeaderCell {...props}>
      <Table.Text color={theme.colours.label}>{children}</Table.Text>
    </BaseTable.HeaderCell>
  )
)

Table.Text = enhance<BoxProps<HTMLParagraphElement>>(
  withProps({
    width: '100%',
    fontWeight: 300,
    fontSize: '0.9rem',
    textAlign: 'inherit'
  })
)(Text)

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
