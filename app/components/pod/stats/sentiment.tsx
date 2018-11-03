import theme from '@/theme'
import { rgba } from 'polished'
import { compose, setDisplayName } from 'recompose'
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory'

import { ChartTitle, commonProps } from '.'

export default compose(setDisplayName('sentiment'))(
  ({ data: initialData, ...props }: any) => (
    <div {...props}>
      <ChartTitle
        title="Sentiment"
        stat={{
          title: 0.5,
          intent: 'danger',
          icon: 'trending-down',
          rate: '2%'
        }}
      />

      <VictoryChart {...commonProps}>
        {initialData.map((data, i) => (
          <VictoryLine
            key={i}
            samples={20}
            y={d => Math[i % 2 ? 'sin' : 'cos'](5 * Math.PI * d.x)}
            interpolation="natural"
            animate={{ duration: 400 }}
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
        ))}

        <VictoryAxis
          style={{
            grid: {
              stroke: rgba(theme.colours.base, 0.05)
            },
            axis: {
              strokeWidth: 2,
              stroke: rgba(theme.colours.base, 0.2)
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
)
