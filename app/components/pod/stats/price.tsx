import { randomData } from '@/lib/utils'
import theme from '@/theme'
import dayjs from 'dayjs'
import { rgba } from 'polished'
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryScatter
} from 'victory'

import { ChartTitle, commonProps, tooltipContainer } from '.'

const data = randomData({
  count: 10,
  min: 3000,
  max: 5000
})

export default () => (
  <div>
    <ChartTitle
      title="Price"
      stat={{
        title: '3.3k',
        intent: 'danger',
        icon: 'trending-down',
        rate: '10%'
      }}
    />

    <VictoryChart {...commonProps} containerComponent={tooltipContainer}>
      <VictoryLine
        interpolation="natural"
        data={data}
        animate={{ duration: 700 }}
        style={{
          data: {
            stroke: theme.colours.secondary,
            strokeWidth: 1
          },
          labels: {
            fontSize: 11,
            fill: theme.colours.bg
          }
        }}
      />

      <VictoryGroup
        style={{
          data: {
            fill: theme.colours.secondary
          },
          labels: {
            fontSize: 11,
            fill: theme.colours.bg
          }
        }}>
        {data.map((d, i) => (
          <VictoryScatter
            key={i}
            data={[Object.assign({}, d, { opacity: 1 })]}
            style={{
              data: {
                opacity: d => d.opacity
              }
            }}
            animate={{
              duration: 700,
              onLoad: {
                duration: (700 / (700 / i + data.length)) * 700,
                before: () => ({
                  opacity: 0
                })
              }
            }}
          />
        ))}
      </VictoryGroup>

      <VictoryAxis
        dependentAxis
        style={{
          grid: {
            stroke: rgba(theme.colours.base, 0.05)
          },
          axis: {
            strokeWidth: 0,
            stroke: rgba(theme.colours.base, 0.05)
          },
          tickLabels: {
            fontSize: 11,
            fill: rgba(theme.colours.base, 0.5)
          }
        }}
      />

      <VictoryAxis
        tickFormat={t => dayjs(t).format('DD/MM')}
        style={{
          grid: {
            stroke: rgba(theme.colours.base, 0.05)
          },
          axis: {
            stroke: rgba(theme.colours.base, 0.05)
          },
          tickLabels: {
            fontSize: 11,
            fill: rgba(theme.colours.base, 0.5)
          }
        }}
      />
    </VictoryChart>
  </div>
)
