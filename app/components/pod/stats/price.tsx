import theme from '@/theme'
import dayjs from 'dayjs'
import { rgba } from 'polished'
import { compose, setDisplayName } from 'recompose'
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryScatter
} from 'victory'

import { commonProps } from '.'

export default compose(setDisplayName('price'))(
  ({ data: initialData }: any) => (
    <VictoryChart {...commonProps}>
      {initialData.map((data, idx) => (
        <VictoryGroup key={idx}>
          <VictoryLine
            interpolation="natural"
            data={data}
            animate={{ duration: 0, onLoad: { duration: 300 } }}
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
                duration: 0,
                onLoad: {
                  duration: (150 / (150 / i + data.length)) * 150,
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
  )
)
