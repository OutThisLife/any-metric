import { fonts, victoryTheme } from '@/theme'
import dynamic from 'next/dynamic'
import { compose, setDisplayName } from 'recompose'
import {
  createContainer,
  VictoryAxis,
  VictoryChart,
  VictoryCommonProps,
  VictoryCursorContainerProps,
  VictoryLabel,
  VictoryZoomContainerProps
} from 'victory'

const presets: TInner['presets'] = {
  Sentiment: dynamic(import('./presets/sentiment').then(m => m.default)),
  Volume: dynamic(import('./presets/volume').then(m => m.default))
}

interface TInner {
  presets: {
    Sentiment: DynamicComponent<{ children: (a: JSX.Element) => JSX.Element }>
    Volume: DynamicComponent<{ children: (a: JSX.Element) => JSX.Element }>
  }
}

interface TOutter extends VictoryCommonProps {
  type: keyof TInner['presets']
}

export default compose<TOutter, TOutter>(setDisplayName('chart-generator'))(({ type, ...props }) => {
  const Chart = presets[type]
  const VictoryContainer: React.ComponentType<
    VictoryZoomContainerProps & VictoryCursorContainerProps
  > = createContainer('zoom', 'cursor')

  return (
    <Chart>
      {children => (
        <aside>
          <VictoryChart
            theme={victoryTheme}
            containerComponent={
              <VictoryContainer
                cursorLabel={d => `${Math.round(d.x)}, ${Math.round(d.y)}`}
                cursorLabelComponent={<VictoryLabel style={{ fontSize: 9, fontFamily: fonts.family.copy }} />}
              />
            }
            {...props}>
            <VictoryAxis />
            <VictoryAxis dependentAxis />
            {children}
          </VictoryChart>
        </aside>
      )}
    </Chart>
  )
})
