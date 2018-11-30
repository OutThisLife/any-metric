import { dateFormat } from '@/lib/utils'
import withSelections, { select, SelectionsProps } from '@/lib/withSelections'
import { FakeResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import * as d3 from 'd3'
import { fitDimensions } from 'react-stockcharts/lib/helper'
import { compose, setDisplayName, withHandlers } from 'recompose'
import { withTheme } from 'styled-components'

import Cols from './Cols'
import Table from './generics'

let tm: d3.Timer | {} = {}

export default compose<
  TableProps & TableOutterProps & BaphoTheme,
  TableOutterProps
>(
  withTheme,
  withSelections,
  fitDimensions,
  withHandlers<{}, TableProps>(() => ({
    handleScroll: () => ({ currentTarget }) => {
      const el = currentTarget.firstChild.firstChild as HTMLElement
      el.style.pointerEvents = 'none'

      if ('stop' in tm) {
        tm.stop()
      }

      tm = d3.timeout(() => (el.style.pointerEvents = 'auto'), 300)
    }
  })),
  setDisplayName('table')
)(({ theme, handleMouse, handleScroll, height, data = [] }) => (
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

      <Cols.Title>Product</Cols.Title>
      <Cols.Time>Date</Cols.Time>
      <Cols.Status>Status</Cols.Status>
      <Cols.Price>Price</Cols.Price>
    </Table.Head>

    <Table.Body
      height={height}
      defaultHeight={50}
      onMouseDown={handleMouse}
      onScroll={handleScroll}
      overscanCount={50}>
      {data.map(d => (
        <Table.Row key={d.id} id={d.id} height={52}>
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

export interface TableProps extends SelectionsProps {
  height?: number
  handleScroll?: React.UIEventHandler<HTMLElement>
}

export interface TableOutterProps {
  data?: FakeResult[]
}
