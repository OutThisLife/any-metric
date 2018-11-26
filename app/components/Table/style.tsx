import Text from '@/components/Text'
import { Table as BaseTable } from 'evergreen-ui'
import { rgba } from 'polished'
import { compose, defaultProps, mapProps } from 'recompose'
import styled, { css, withTheme } from 'styled-components'
import { BaphoTheme } from 'typings'

const enhance = compose<Props & BaphoTheme, Props>(
  withTheme,
  defaultProps({
    marginX: 0,
    marginY: 0,
    paddingX: 0,
    paddingY: 0,
    borderBottom: '0px'
  }),
  mapProps(({ isHeader, ...props }) => props)
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
        transition: 0.1s ease-in-out;
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
  `}
` as BaseTable

// ---------------------------

Table.Head = enhance(({ theme, ...props }) => (
  <BaseTable.Head background="none" {...props} />
))

Table.Body = enhance(({ theme, ...props }) => (
  <BaseTable.VirtualBody allowAutoHeight {...props} />
))

Table.Row = enhance(({ theme, ...props }) => (
  <BaseTable.Row className="row" height="auto" {...props} />
))

Table.Cell = enhance(({ theme, ...props }) => (
  <BaseTable.Cell className="cell" {...props} />
))

Table.HeaderCell = enhance(({ theme, children, ...props }) => (
  <BaseTable.HeaderCell {...props}>
    <Table.Text color={theme.colours.label}>{children}</Table.Text>
  </BaseTable.HeaderCell>
))

Table.Text = enhance(({ theme, ...props }) => (
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

interface Props {
  [key: string]: any
}

export default Table
