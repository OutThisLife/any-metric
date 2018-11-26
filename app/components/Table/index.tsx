import Box from '@/components//Box'
import withDimensions, { DimProps } from '@/lib/withDimensions'
import { FakeCrawlResult } from '@/server/schema/types'
import { Icon } from 'evergreen-ui'
import { compose, setDisplayName, withHandlers, withProps } from 'recompose'
import { withTheme } from 'styled-components'
import { BaphoTheme } from 'typings'

import Cols from './Cols'
import Table from './style'

export default compose<TOutter & DimProps & BaphoTheme, TOutter>(
  withTheme,
  withDimensions,
  withProps(({ height }) => ({ height: height * 0.9 })),
  withHandlers(() => ({
    handleMouse: () => ({
      currentTarget: $table,
      target: { tagName, offsetParent: $row },
      shiftKey
    }) => {
      if (tagName.toLowerCase() === 'input') {
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

      if ($first && firstIdx !== idx && shiftKey) {
        const c = firstIdx < idx ? idx : firstIdx
        let n = firstIdx < idx ? firstIdx + 1 : idx

        while (n !== c) {
          select($rows[n++])
        }
      }

      select($row)

      const handleMouseMove = ({ target: { offsetParent: $hoverRow } }) =>
        select($hoverRow)

      $table.addEventListener('mousemove', handleMouseMove)
      $table.addEventListener(
        'mouseup',
        () => {
          ;[].slice
            .call(document.getElementsByClassName('seen'))
            .forEach(el => el.classList.remove('seen'))

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
    }
  })),
  setDisplayName('table')
)(
  ({
    theme,
    handleMouse,
    handleChangeAll,
    handleChange,
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
        <Cols.Time isHeader>Date</Cols.Time>
        <Cols.Cell isHeader>Status</Cols.Cell>
        <Cols.Price isHeader>Price</Cols.Price>
      </Table.Head>

      <Table.Body height={height} onMouseDown={handleMouse}>
        {data.map((d, i) => (
          <Table.Row key={d.id}>
            <Cols.Check
              checkboxProps={{
                name: 'product-checked',
                value: d.id,
                onChange: handleChange
              }}
            />

            <Cols.Title>
              <Box
                is="img"
                src={d.image}
                alt={d.title}
                width={35}
                marginRight={15}
                style={{ filter: 'grayscale(1) opacity(0.5)' }}
              />

              <Box
                paddingRight="2rem"
                overflow="hidden"
                textOverflow="ellipsis">
                <Table.Text
                  is="a"
                  href={d.slug}
                  target="_blank"
                  rel="noopener"
                  fontSize="1rem"
                  fontWeight={500}>
                  {d.title} <Icon icon="document-open" />
                </Table.Text>

                <Table.Text
                  is="p"
                  whiteSpace="nowrap"
                  color={theme.colours.muted}>
                  {d.copy}
                </Table.Text>
              </Box>
            </Cols.Title>

            <Cols.Time>
              <Table.Text color={theme.colours.muted}>
                2/12/2017 - 11.30.05
              </Table.Text>
            </Cols.Time>

            <Cols.Cell>
              <Table.Text
                color={i > 10 ? theme.colours.label : theme.colours.muted}>
                {i > 10 ? 'Sold' : 'Pending'}
              </Table.Text>
            </Cols.Cell>

            <Cols.Price>
              <Table.Text
                fontWeight={700}
                backgroundImage={
                  Math.random() > 0.2
                    ? theme.colours.price.up
                    : theme.colours.price.down
                }>
                $100
              </Table.Text>
            </Cols.Price>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
)

interface TOutter {
  data: FakeCrawlResult[]
}
