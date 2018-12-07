import { moneyFormat, numFormat } from '@/lib/utils'
import { MockResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import * as d3 from 'd3'
import { ClickCallback } from 'react-stockcharts/lib/interactive'
import { HoverTooltip } from 'react-stockcharts/lib/tooltip'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import { unlink } from '.'

export default compose<BaphoTheme, {}>(
  setDisplayName('chart-toolip'),
  withTheme
)(({ theme }) => (
  <>
    <HoverTooltip
      yAccessor={d => d.close}
      fontSize={11}
      bgOpacity={0}
      fontFill={theme.colours.base}
      fill="transparent"
      stroke="transparent"
      tooltipContent={({ currentItem }: { currentItem: MockResult }) =>
        currentItem.close && {
          x: currentItem.title,
          y: [
            {
              label: 'Price',
              value: moneyFormat(parseFloat(currentItem.close))
            },
            {
              label: 'Qty',
              value: numFormat(parseInt(currentItem.quantity, 10))
            }
          ]
        }
      }
    />

    <ClickCallback
      onMouseMove={({ currentItem }) => {
        unlink()

        const $row = document.getElementById(currentItem.id)

        if ($row) {
          const $table = document.querySelector('table').parentElement

          $row.classList.add('chart-link')

          d3.transition()
            .duration(90)
            .ease(d3.easeCubic)
            .tween('scrollTop', () => {
              const i = d3.interpolateNumber(
                $table.scrollTop,
                $row.offsetTop - $row.clientHeight
              )

              return t => ($table.scrollTop = i(t))
            })
        }
      }}
    />
  </>
))
