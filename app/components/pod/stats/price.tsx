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

import { ChartTitle, commonProps } from '.'

export default ({ data: initialData, ...props }: any) => (
  <div {...props}>
    <ChartTitle
      title="Price"
      stat={{
        title: '3.3k',
        intent: 'danger',
        icon: 'trending-down',
        rate: '10%'
      }}
    />

    <VictoryChart {...commonProps}>
      {initialData.map((data, idx) => (
        <VictoryGroup key={idx}>
          <VictoryLine
            interpolation="natural"
            data={data}
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

      {initialData.map((data, idx) => (
        <VictoryGroup
          key={idx}
          style={{
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
                  fill: d.colour,
                  opacity: d => d.opacity
                }
              }}
              animate={{
                duration: 200,
                onLoad: {
                  duration: (200 / (200 / i + data.length)) * 200,
                  before: () => ({
                    opacity: 0
                  })
                }
              }}
            />
          ))}
        </VictoryGroup>
      ))}

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
