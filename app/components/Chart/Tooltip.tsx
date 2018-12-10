import { moneyFormat, numFormat } from '@/lib/utils'
import { Product } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import * as d3 from 'd3'
import { ClickCallback } from 'react-stockcharts/lib/interactive'
import { HoverTooltip } from 'react-stockcharts/lib/tooltip'
import { compose, defaultProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import { unlink } from '.'

export default compose<TooltipProps & BaphoTheme, TooltipProps>(
  setDisplayName('chart-toolip'),
  defaultProps({
    fontSize: 11
  }),
  withTheme
)(({ theme, fontSize }) => (
  <>
    <HoverTooltip
      yAccessor={d => d.close}
      fontSize={fontSize}
      bgOpacity={0}
      fontFill={theme.colours.base}
      fill="transparent"
      stroke="transparent"
      tooltipContent={({
        currentItem
      }: {
        currentItem: Product & { close?: number }
      }) =>
        currentItem.close && {
          x: currentItem.title,
          y: [
            {
              label: 'Price',
              value: moneyFormat(currentItem.close)
            },
            {
              label: 'Qty',
              value: numFormat(currentItem.qty)
            }
          ]
        }
      }
    />

    <ClickCallback
      onMouseMove={({ currentItem }) => {
        if (document.getElementById('price-chart-modal')) {
          return
        }

        unlink()

        const $row = document.getElementById(currentItem.id)
        const $td = $row.firstChild as HTMLElement

        if ($row) {
          const $table = document.querySelector('table').parentElement

          $row.classList.add('chart-link')

          d3.transition()
            .duration(90)
            .ease(d3.easeCubic)
            .tween('scrollTop', () => {
              const i = d3.interpolateNumber(
                $table.scrollTop,
                $td.offsetTop - $td.clientHeight
              )

              return t => ($table.scrollTop = i(t))
            })
        }
      }}
    />
  </>
))

interface TooltipProps {
  fontSize?: number
}
