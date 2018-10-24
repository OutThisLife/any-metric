import { smooth } from '@/lib/utils'
import theme from '@/theme'
import dayjs from 'dayjs'
import { rgba } from 'polished'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLine
} from 'victory'

import { ChartTitle, commonProps, tooltipContainer } from '.'

export default ({ data: initialData }: any) => (
  <div>
    <ChartTitle
      title="Volume"
      stat={{
        title: 300,
        intent: 'success',
        icon: 'trending-up',
        rate: '5%'
      }}
    />

    <VictoryChart {...commonProps} containerComponent={tooltipContainer}>
      {initialData.map((data, idx) => (
        <VictoryGroup key={idx}>
          <VictoryLine
            data={smooth(data)}
            interpolation="natural"
            animate={{ duration: 200 }}
            style={{
              data: {
                stroke: data[0].colour,
                strokeWidth: 1
              },
              labels: {
                fontSize: 11,
                fill: theme.colours.bg
              }
            }}
          />
        </VictoryGroup>
      ))}

      <VictoryBar
        data={initialData[0]}
        animate={{ duration: 400 }}
        style={{
          data: {
            fill: rgba(theme.colours.secondary, 0.06)
          },
          labels: {
            fontSize: 11,
            fill: theme.colours.bg
          }
        }}
      />

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
