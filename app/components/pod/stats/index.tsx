import theme from '@/theme'
import { Heading, Icon, Text } from 'evergreen-ui'
import { rgba } from 'polished'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory'

import Stats from './style'

export default props => (
  <Stats {...props}>
    <div>
      <hgroup>
        <Heading is="h2" size={400} color="muted">
          Volume
        </Heading>

        <Text size={600}>300</Text>
        <Text size={500} color="success">
          <Icon icon="trending-up" marginRight={4} marginLeft={4} />
          5%
        </Text>
      </hgroup>

      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={d => d.y}
            labelComponent={
              <VictoryTooltip
                cornerRadius={2}
                flyoutStyle={{
                  strokeWidth: 0,
                  fill: theme.colours.base
                }}
              />
            }
          />
        }>
        <VictoryBar
          data={[
            { x: new Date(2018, 1, 1), y: 40 },
            { x: new Date(2018, 1, 2), y: 45 },
            { x: new Date(2018, 1, 3), y: 50 },
            { x: new Date(2018, 1, 4), y: 50 },
            { x: new Date(2018, 1, 5), y: 55 }
          ]}
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
        <VictoryLine
          data={[
            { x: new Date(2018, 1, 1), y: 35 },
            { x: new Date(2018, 1, 2), y: 40 },
            { x: new Date(2018, 1, 3), y: 40 },
            { x: new Date(2018, 1, 4), y: 45 },
            { x: new Date(2018, 1, 5), y: 50 }
          ]}
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
        <VictoryScatter
          data={[
            { x: new Date(2018, 1, 1), y: 35 },
            { x: new Date(2018, 1, 2), y: 40 },
            { x: new Date(2018, 1, 3), y: 40 },
            { x: new Date(2018, 1, 4), y: 45 },
            { x: new Date(2018, 1, 5), y: 50 }
          ]}
          style={{
            data: {
              fill: theme.colours.secondary
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
          tickFormat={t => {
            const d = new Date(t)
            return d.getMonth() + '/' + d.getDate()
          }}
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

    <div>
      <hgroup>
        <Heading is="h2" size={400} color="muted">
          Price <sup>(USD)</sup>
        </Heading>

        <Text size={600}>3.3k</Text>
        <Text size={500} color="danger">
          <Icon icon="trending-down" marginRight={4} marginLeft={4} />
          10%
        </Text>
      </hgroup>

      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={d => d.y}
            labelComponent={
              <VictoryTooltip
                cornerRadius={2}
                flyoutStyle={{
                  strokeWidth: 0,
                  fill: theme.colours.base
                }}
              />
            }
          />
        }>
        <VictoryLine
          interpolation="natural"
          data={[
            { x: new Date(2018, 1, 1), y: 5000 },
            { x: new Date(2018, 1, 2), y: 4000 },
            { x: new Date(2018, 1, 3), y: 4000 },
            { x: new Date(2018, 1, 4), y: 4500 },
            { x: new Date(2018, 1, 5), y: 3300 }
          ]}
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
        <VictoryScatter
          data={[
            { x: new Date(2018, 1, 1), y: 5000 },
            { x: new Date(2018, 1, 2), y: 4000 },
            { x: new Date(2018, 1, 3), y: 4000 },
            { x: new Date(2018, 1, 4), y: 4500 },
            { x: new Date(2018, 1, 5), y: 3300 }
          ]}
          style={{
            data: {
              fill: theme.colours.secondary
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
          tickFormat={t => {
            const d = new Date(t)
            return d.getMonth() + '/' + d.getDate()
          }}
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
  </Stats>
)
