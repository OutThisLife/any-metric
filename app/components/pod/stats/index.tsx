import { getMaxima, processRadar, randomData } from '@/lib/utils'
import { getAvg } from '@/lib/utils/maths'
import theme, { autoColour } from '@/theme'
import { Heading, Icon, Text } from 'evergreen-ui'
import faker from 'faker'
import { func } from 'prop-types'
import { compose, getContext, withPropsOnChange } from 'recompose'
import { VictoryTooltip, VictoryVoronoiContainer } from 'victory'

import { DataTableFilter } from '..'
import Price from './price'
import Quantity from './quantity'
import Sentiment from './sentiment'
import Stats from './style'
import Volume from './volume'

interface TOutter {
  current: string
}

interface TInner {
  filter?: DataTableFilter
  priceData?: any[]
  quantityData?: any[]
  volumeData?: any[]
  sentimentData?: any[]
}

export default compose<TInner, TOutter>(
  getContext({ filter: func }),
  withPropsOnChange<TInner, TOutter>(['current'], ({ current }) => {
    const applyColour = (d: any, i: number): string => ({
      ...d,
      colour:
        i === 0
          ? theme.colours.secondary
          : autoColour(current, true).backgroundColor
    })

    const volumeData = (_, i) =>
      randomData({
        min: 10,
        max: 60
      }).map(d => applyColour(d, i))

    const priceData = (_, i) =>
      randomData({
        count: 10,
        min: 3000,
        max: 5000
      }).map(d => applyColour(d, i))

    const sentimentData = (_, i) =>
      randomData({ count: 1, min: 25, max: 100 }).map(d => applyColour(d, i))

    const quantityData = () => ({
      sourceData: [...Array(3).keys()].map(() => ({
        ebay: faker.random.number({ min: 100, max: 200 }),
        amazon: faker.random.number({ min: 100, max: 200 }),
        facebook: faker.random.number({ min: 100, max: 200 }),
        baidu: faker.random.number({ min: 100, max: 200 }),
        listia: faker.random.number({ min: 100, max: 200 })
      })),
      get data() {
        return processRadar(this.sourceData)
      },
      get maxima() {
        return getMaxima(this.sourceData)
      },
      get avg() {
        return getAvg(this.sourceData)
      }
    })

    const createSet = (cb: (a: any, i: number) => any) =>
      [...Array(current.length ? 2 : 1).keys()].map(cb)

    return {
      volumeData: createSet(volumeData),
      priceData: createSet(priceData),
      sentimentData: createSet(sentimentData),
      quantityData: quantityData()
    }
  })
)(({ sentimentData, volumeData, quantityData, priceData }) => (
  <Stats>
    <Price data={priceData} />
    <Volume data={volumeData} />
    <Sentiment data={sentimentData} />
    <Quantity {...quantityData} />
  </Stats>
))

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
