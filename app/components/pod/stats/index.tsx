import Button from '@/components/button'
import SideSheet from '@/components/sideSheet'
import { Loading } from '@/lib/queries'
import theme from '@/theme'
import { Position } from 'evergreen-ui'
import dynamic from 'next/dynamic'
import { createElement } from 'react'
import { compose, setDisplayName, withState } from 'recompose'
import {
  VictoryChartProps,
  VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory'

import ChartTitle from './chartTitle'
import withMocks, { TInner as MockTInner } from './lib/mocks'
import Stats from './style'

const Charts = {
  Price: dynamic(import('./price') as any),
  Quantity: dynamic(import('./quantity') as any),
  Sentiment: dynamic(import('./sentiment') as any),
  Volume: dynamic(import('./volume') as any)
}

interface TInner extends MockTInner {
  loading: boolean
  setLoadingState: (b: boolean, cb?: any) => void
}

export default compose<TInner, {}>(
  setDisplayName('stats'),
  withMocks,
  withState('loading', 'setLoadingState', true)
)(({ loading, setLoadingState, mocks }) => (
  <SideSheet
    position={Position.BOTTOM}
    containerProps={{
      height: '50vh'
    }}
    onClose={() => setLoadingState(true)}
    tabs={Object.keys(Charts)}
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
        {loading ? (
          <Loading style={{ padding: '5vw 0' }} />
        ) : (
          <div key={tab} style={{ width: '50%' }}>
            {createElement(Charts[tab], {
              data: mocks[tab.toLowerCase()]
            })}
          </div>
        )}
      </Stats>
    )}>
    {({ toggle }) => (
      <Button
        href="javascript:;"
        appearance="minimal"
        icon="chart"
        data-tip="View Charts"
        onClick={() =>
          toggle(true, setTimeout(() => setLoadingState(false), 500))
        }
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
