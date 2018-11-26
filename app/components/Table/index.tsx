import { dateFormat } from '@/lib/utils'
import withDimensions, { DimState } from '@/lib/withDimensions'
import { FakeResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import * as d3 from 'd3'
import { compose, setDisplayName, withHandlers, withProps } from 'recompose'
import { withTheme } from 'styled-components'

import Cols from './Cols'
import Table from './style'

let tm

export default compose<
  TableProps & TableOutterProps & BaphoTheme,
  TableOutterProps
>(
  withTheme,
  withDimensions,
  withProps<TableProps, TableProps>(({ height }) => ({
    height: height * 0.9
  })),
  withHandlers(() => ({
    handleMouse: () => ({
      currentTarget: $table,
      target: { tagName, offsetParent: $row },
      shiftKey,
      button
    }) => {
      if (tagName.toLowerCase() === 'input' || button) {
        return
      }

      const $rows = [].slice.call($table.getElementsByClassName('row'))
      const $first = $table.querySelector("[data-checked='true']")

      const firstIdx = $rows.indexOf($first)
      const idx = $rows.indexOf($row)

      const select = el => {
        if (!el || el.classList.contains('seen')) {
          return
        }

        el.classList.add('seen')
        const $input = el.querySelector('input')

        if ($input instanceof HTMLInputElement) {
          $input.click()
        }
      }

      if (shiftKey && $first && firstIdx !== idx) {
        const c = firstIdx < idx ? idx : firstIdx
        let n = firstIdx < idx ? firstIdx + 1 : idx

        while (n !== c) {
          select($rows[n++])
        }
      }

      select($row)

      const handleMouseMove = ({ target: { offsetParent: $hoverRow } }) => {
        $table.classList.add('dragging')
        select($hoverRow)
      }

      $table.addEventListener('mousemove', handleMouseMove)
      $table.addEventListener(
        'mouseup',
        () => {
          ;[].slice
            .call(document.getElementsByClassName('seen'))
            .forEach(el => el.classList.remove('seen'))

          $table.classList.remove('dragging')
          $table.removeEventListener('mousemove', handleMouseMove)
        },
        { once: true }
      )
    },

    handleChangeAll: () => ({ target }) => {
      const $all = document.getElementsByName(target.name)
      target.checked = !target.checked

      //
      ;[].slice.call($all).forEach((el: HTMLInputElement) => {
        const $row = el.closest('.row')
        el.checked = !el.checked

        if ($row instanceof HTMLElement) {
          $row.dataset.checked = String(el.checked)
        }
      })
    },

    handleChange: () => e => {
      e.stopPropagation()

      const { target } = e
      const $row = target.closest('.row')

      if ($row instanceof HTMLElement) {
        $row.dataset.checked = String(target.checked)
      }
    },

    handleScroll: () => ({ currentTarget }) => {
      const el = currentTarget.firstChild.firstChild
      el.style.pointerEvents = 'none'

      if (typeof tm === 'object') {
        tm.stop()
      }

      tm = d3.timeout(() => (el.style.pointerEvents = 'auto'), 400)
    }
  })),
  setDisplayName('table')
)(
  ({
    theme,
    handleMouse,
    handleChangeAll,
    handleChange,
    handleScroll,
    data = [],
    height
  }) => (
    <Table>
      <Table.Head className="head">
        <Cols.Check
          checkboxProps={{
            name: 'product-checked',
            value: 'all',
            onChange: handleChangeAll
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
                name: 'product-checked',
                value: d.id,
                onChange: handleChange
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
  )
)

export interface TableProps extends Partial<DimState> {
  handleMouse?: (e?: React.MouseEvent<HTMLElement>) => void
  handleChangeAll?: (e?: React.MouseEvent<HTMLElement>) => void
  handleChange?: (e?: React.MouseEvent<HTMLElement>) => void
  handleScroll?: (e?: React.UIEvent<HTMLElement>) => void
}

interface TableOutterProps {
  data?: FakeResult[]
}
