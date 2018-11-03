import Button from '@/components/button'
import SideSheet from '@/components/sideSheet'
import theme from '@/theme'
import { Position } from 'evergreen-ui'
import dynamic from 'next/dynamic'
import { createElement } from 'react'
import { compose, setDisplayName } from 'recompose'
import { VictoryTooltip, VictoryVoronoiContainer } from 'victory'

import withMocks, { TInner as MockTInner } from './lib/mocks'
import Stats from './style'

export { default as ChartTitle } from './title'

const Charts = {
  Price: dynamic(import('./price') as any),
  Quantity: dynamic(import('./quantity') as any),
  Sentiment: dynamic(import('./sentiment') as any),
  Volume: dynamic(import('./volume') as any)
}

export default compose<MockTInner, {}>(
  setDisplayName('stats'),
  withMocks
)(({ mocks }) => (
  <SideSheet
    title="Data Visualizations"
    position={Position.BOTTOM}
    containerProps={{
      height: '50vh'
    }}
    tabs={Object.keys(Charts)}
    render={({ tab }) => (
      <Stats>
        {createElement(Charts[tab], {
          data: mocks[tab.toLowerCase()],
          className: 'chart'
        })}
      </Stats>
    )}>
    {({ isShown, toggle }) => (
      <Button
        href="javascript:;"
        appearance="minimal"
        icon="chart"
        data-tip="View Charts"
        onClick={() => toggle(!isShown)}
      />
    )}
  </SideSheet>
))

export const commonProps = {
  animate: false,
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
