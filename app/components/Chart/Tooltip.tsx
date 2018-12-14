import { moneyFormat, numFormat } from '@/lib/utils'
import { Product } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import { ClickCallback } from 'react-stockcharts/lib/interactive'
import { HoverTooltip } from 'react-stockcharts/lib/tooltip'
import { compose, defaultProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

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
      }) => {
        if (!currentItem.close) {
          return
        }

        const x = currentItem.title
        const y = []

        y.push({
          label: 'Price',
          value: moneyFormat(currentItem.close)
        })

        if (currentItem.qty > 0) {
          y.push({
            label: 'Qty',
            value: numFormat(currentItem.qty)
          })
        }

        return { x, y }
      }}
    />

    <ClickCallback
      onClick={({
        currentItem
      }: {
        currentItem: Product & { close?: number }
      }) => window.open(currentItem.url, '_blank')}
    />
  </>
))

interface TooltipProps {
  fontSize?: number
}
