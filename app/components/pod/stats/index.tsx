import Button from '@/components/button'
import SideSheet from '@/components/sideSheet'
import { Loading } from '@/lib/queries'
import theme from '@/theme'
import dynamic from 'next/dynamic'
import { createElement } from 'react'
import { compose, setDisplayName } from 'recompose'
import {
  VictoryChartProps,
  VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory'

import ChartTitle from './chartTitle'
import withMocks, { TInner as MockTInner } from './lib/mocks'
import Stats from './style'

const [GetChart, charts]: any[] = (() => {
  const loading = () => <Loading style={{ padding: '5vw 0' }} />

  const list = {
    price: dynamic({
      ssr: false,
      loader: () => import(/* webpackChunkName: "PriceChart" */ './price'),
      loading,
      webpack: ['./price']
    }),

    quantity: dynamic({
      ssr: false,
      loader: () =>
        import(/* webpackChunkName: "QuantityChart" */ './quantity'),
      loading,
      webpack: ['./quantity']
    }),

    sentiment: dynamic({
      ssr: false,
      loader: () =>
        import(/* webpackChunkName: "SentimentChart" */ './sentiment'),
      loading,
      webpack: ['./sentiment']
    }),

    volume: dynamic({
      ssr: false,
      loader: () => import(/* webpackChunkName: "VolumeChart" */ './volume'),
      loading,
      webpack: ['./volume']
    })
  }

  const keys = Object.keys(list)

  return [
    ({ template, ...props }) => {
      if (template in list) {
        const C = list[template]
        return <C key={template} {...props} />
      }

      console.error(props, 'not in', list)

      return null
    },
    keys
  ]
})()

export default compose<MockTInner, {}>(
  setDisplayName('stats'),
  withMocks
)(({ mocks }) => (
  <SideSheet
    tabs={charts}
    title={({ tab }) => (
      <ChartTitle
        title={tab}
        stat={{
          title: '3.3k',
          intent: 'danger',
          icon: 'trending-down',
          rate: '10%'
        }}
      />
    )}
    render={({ tab }) => (
      <Stats>
        <div key={tab}>
          <GetChart template={tab} data={mocks[tab]} />
        </div>
      </Stats>
    )}>
    {({ toggle }) => (
      <Button
        href="javascript:;"
        appearance="minimal"
        icon="chart"
        data-tip="View Charts"
        onClick={() => toggle(true)}
      />
    )}
  </SideSheet>
))

export const commonProps: Partial<VictoryChartProps> = {
  animate: {
    duration: 0,
    onLoad: {
      duration: 0
    }
  },
  domainPadding: 20,
  padding: {
    top: 50,
    right: 25,
    bottom: 50,
    left: 50
  }
}

export const tooltipContainer = (
  <VictoryVoronoiContainer
    voronoiDimension="x"
    labels={d => parseInt(d.y, 10)}
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

export { ChartTitle }
