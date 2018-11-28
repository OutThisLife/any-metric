import { dateFormat } from '@/lib/utils'
import withDimensions, { DimState } from '@/lib/withDimensions'
import withSelections, { select, SelectionsProps } from '@/lib/withSelections'
import { FakeResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import * as d3 from 'd3'
import { compose, setDisplayName, withHandlers, withProps } from 'recompose'
import { withTheme } from 'styled-components'

import Cols from './Cols'
import Table from './generics'

let tm

export default compose<
  TableProps & TableOutterProps & BaphoTheme,
  TableOutterProps
>(
  withTheme,
  withDimensions,
  withSelections,
  withProps<TableProps, TableProps>(({ height }) => ({
    height: height * 0.9
  })),
  withHandlers<{}, TableProps>(() => ({
    handleScroll: () => ({ currentTarget }) => {
      const el = currentTarget.firstChild.firstChild as HTMLElement
      el.style.pointerEvents = 'none'

      if (typeof tm === 'object') {
        tm.stop()
      }

      tm = d3.timeout(() => (el.style.pointerEvents = 'auto'), 400)
    }
  })),
  setDisplayName('table')
)(({ theme, handleMouse, handleScroll, data = [], height }) => (
  <Table>
    <Table.Head className="head">
      <Cols.Check
        checkboxProps={{
          name: 'product-checked',
          value: 'all',
          onClick: ({ target }) =>
            [].slice
              .call(document.getElementsByName(target.name))
              .forEach(select)
        }}
      />

      <Cols.Title isHeader>Product</Cols.Title>
      <Cols.Time isHeader textAlign="right">
        Date
      </Cols.Time>
      <Cols.Status isHeader>Status</Cols.Status>
      <Cols.Price isHeader>Price</Cols.Price>
    </Table.Head>

    <Table.Body
      height={height}
      onMouseDown={handleMouse}
      onScroll={handleScroll}>
      {data.map(d => (
        <Table.Row key={d.id}>
          <Cols.Check
            checkboxProps={{
              pointerEvents: 'none',
              name: 'product-checked',
              value: d.id
            }}
          />

          <Cols.Title item={d} />

          <Cols.Time>
            <Table.Text color={theme.colours.muted}>
              {dateFormat(d.date)}
            </Table.Text>
          </Cols.Time>

          <Cols.Status item={d} />
          <Cols.Price item={d} />
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
))

export interface TableProps extends Partial<DimState>, SelectionsProps {
  handleScroll?: React.UIEventHandler<HTMLElement>
}

export interface TableOutterProps {
  data?: FakeResult[]
}
