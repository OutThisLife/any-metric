import theme from '@/theme'
import { rgba } from 'polished'
import { compose, setDisplayName } from 'recompose'
import {
  VictoryArea,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryPolarAxis
} from 'victory'

import { ChartTitle, commonProps } from '.'

export default compose(setDisplayName('quantity'))(
  ({ data: { data, maxima, avg }, ...props }: any) => (
    <div {...props}>
      <ChartTitle
        title={
          <>
            Price by
            <br />
            source
          </>
        }
      />

      <VictoryChart
        {...commonProps}
        polar
        domain={{ y: [0, 1] }}
        domainPadding={0}>
        <VictoryGroup
          colorScale={[
            theme.egScales.blue.B5A,
            theme.egScales.blue.B6A,
            theme.egScales.blue.B7A
          ]}
          style={{
            data: {
              fillOpacity: 0.1,
              strokeWidth: 2
            }
          }}>
          {data.map((d, i) => (
            <VictoryArea
              key={i}
              data={d}
              animate={{
                duration: 700,
                onLoad: {
                  duration: 700 + i * 300
                }
              }}
            />
          ))}
        </VictoryGroup>

        {Object.keys(maxima).map((k, i) => (
          <VictoryPolarAxis
            key={i}
            dependentAxis
            style={{
              axisLabel: {
                padding: 10,
                fontSize: 11,
                fill: theme.colours.base
              },
              tickLabels: {
                fontSize: 9,
                fill: rgba(theme.colours.base, 0.5)
              },
              axis: { stroke: 'none' },
              grid: {
                stroke: rgba(theme.colours.base, 0.05),
                strokeWidth: 0.25,
                opacity: 0.2
              }
            }}
            labelPlacement="perpendicular"
            tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
            axisValue={i + 1}
            label={`${k}($${avg[k].toFixed(2)})`}
            tickFormat={t => `$${Math.ceil(t * maxima[k])}`}
            tickValues={[0.25, 0.5, 0.75]}
          />
        ))}

        <VictoryPolarAxis
          labelPlacement="parallel"
          tickFormat={() => ''}
          style={{
            axis: { stroke: 'none' },
            grid: { stroke: rgba(theme.colours.base, 0.05), opacity: 0.5 }
          }}
        />
      </VictoryChart>
    </div>
  )
)
