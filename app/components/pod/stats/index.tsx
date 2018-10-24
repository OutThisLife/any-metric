import theme from '@/theme'
import { Heading, Icon, Text } from 'evergreen-ui'
import { VictoryTooltip, VictoryVoronoiContainer } from 'victory'

import Price from './price'
import Quantity from './quantity'
import Sentiment from './sentiment'
import Stats from './style'
import Volume from './volume'

export default () => (
  <Stats>
    <Volume />
    <Price />
    <Sentiment />
    <Quantity />
  </Stats>
)

export const ChartTitle = ({
  title,
  stat
}: {
  title: string | JSX.Element
  stat?: {
    title: string | number
    rate: string | number
    intent: 'danger' | 'success' | string
    icon: string
  }
}) => (
  <hgroup>
    <Heading is="h2" size={400} color="muted">
      {title}
    </Heading>

    {stat && (
      <>
        <Text size={600}>{stat.title}</Text>
        <Text size={500} color={stat.intent}>
          <Icon icon={stat.icon} marginRight={4} marginLeft={4} />
          {stat.rate}
        </Text>
      </>
    )}
  </hgroup>
)

export const commonProps = {
  domainPadding: 20,
  padding: {
    top: 50,
    right: 25,
    bottom: 50,
    left: 50
  },
  animate: false
}

export const tooltipContainer = (
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
)
