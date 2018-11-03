import theme from '@/theme'
import { Dialog, Heading, Icon, Text } from 'evergreen-ui'
import dynamic from 'next/dynamic'
import {
  cloneElement,
  createElement,
  createRef,
  ReactElement,
  ReactInstance,
  RefObject,
  SFCElement
} from 'react'
import {
  compose,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from 'recompose'
import { VictoryTooltip, VictoryVoronoiContainer } from 'victory'

import withMocks, { TInner as MockInner } from './lib/mocks'
import Stats from './style'

const Charts = {
  Price: dynamic(import('./price') as any),
  Quantity: dynamic(import('./quantity') as any),
  Sentiment: dynamic(import('./sentiment') as any),
  Volume: dynamic(import('./volume') as any)
}

interface TOutter {
  current: string
}

interface TState {
  isChartOpen: boolean
  chartTitle?: string
  ChartComponent?: React.SFC
}

interface TStateHandles extends StateHandlerMap<TState> {
  openChart: StateHandler<TState>
  closeChart: StateHandler<TState>
}

export default compose<TStateHandles & TState & MockInner, TOutter>(
  withMocks,
  withStateHandlers<MockInner & TState, TStateHandles>(
    {
      isChartOpen: false,
      chartTitle: '',
      ChartComponent: () => null
    },
    {
      openChart: (_, { mocks }) => t => {
        const C = Charts[t]

        return {
          isChartOpen: true,
          chartTitle: '',
          ChartComponent: <C data={mocks[t.toLowerCase()]} />
        }
      },

      closeChart: () => () => ({
        isChartOpen: false,
        chartTitle: '',
        ChartComponent: () => null
      })
    }
  )
)(
  ({
    mocks,
    openChart,
    closeChart,
    isChartOpen,
    chartTitle,
    ChartComponent
  }) => (
    <Stats onWheel={e => (e.currentTarget.scrollLeft += e.deltaY)}>
      {Object.keys(Charts).map((t, i) => {
        const C = Charts[t]

        return <C data={mocks[t.toLowerCase()]} onClick={() => openChart(t)} />
      })}

      <Dialog
        isShown={isChartOpen}
        title={chartTitle}
        onCloseComplete={closeChart}>
        <></>
      </Dialog>
    </Stats>
  )
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
