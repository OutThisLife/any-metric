import Button from '@/components/button'
import SideSheet from '@/components/sideSheet'
import theme from '@/theme'
import dynamic from 'next/dynamic'
import { compose } from 'recompose'
import { VictoryTooltip, VictoryVoronoiContainer } from 'victory'

import withMocks, { TInner } from './lib/mocks'
import Stats from './style'

const Charts = {
  Price: dynamic(import('./price') as any),
  Quantity: dynamic(import('./quantity') as any),
  Sentiment: dynamic(import('./sentiment') as any),
  Volume: dynamic(import('./volume') as any)
}

export default compose<TInner, {}>(withMocks)(({ mocks }) => (
  <SideSheet
    render={() => (
      <Stats>
        {Object.keys(Charts).map(t => {
          const C = Charts[t]

          return <C data={mocks[t.toLowerCase()]} />
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

export { default as ChartTitle } from './title'
