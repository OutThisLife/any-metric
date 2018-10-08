import { DynamicChart } from '@/components/charts/presets'
import { fonts, victoryTheme } from '@/theme'
import { last, maxBy, minBy } from 'lodash'
import dynamic from 'next/dynamic'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'
import {
  createContainer,
  DomainPropType,
  VictoryAxis,
  VictoryChart,
  VictoryCommonProps,
  VictoryCursorContainerProps,
  VictoryLabel,
  VictoryZoomContainerProps
} from 'victory'

interface TOutter extends VictoryCommonProps {
  type: keyof TInner['presets']
}

interface TInner {
  presets: {
    Sentiment: DynamicComponent<DynamicChart>
    Volume: DynamicComponent<DynamicChart>
  }
}

const presets: TInner['presets'] = {
  Sentiment: dynamic(import('./presets/sentiment').then(m => m.default)),
  Volume: dynamic(import('./presets/volume').then(m => m.default))
}

interface TState {
  zoomConstraint: DomainPropType
  setZoomConstraint: (a: DomainPropType) => DomainPropType
}

interface THandles {
  getEntireDomain: (data: any[]) => DomainPropType
  getData: (data: any[]) => any[]
}

export default compose<THandles & TState & TInner & TOutter, TOutter>(
  setDisplayName('chart-generator'),
  withState('zoomConstraint', 'setZoomConstraint', undefined),
  withHandlers<TState, THandles>(() => ({
    getEntireDomain: () => data => ({
      x: [data[0].x, last(data).x],
      y: [minBy(data, d => d.y).y, maxBy(data, d => d.y).y]
    }),

    getData: ({ zoomConstraint }) => data => {
      if (!zoomConstraint) {
        return data
      }

      const maxPoints = 120

      const startIndex = data.findIndex(d => d.x >= zoomConstraint[0])
      const endIndex = data.findIndex(d => d.x > zoomConstraint[1])
      const filtered = data.slice(startIndex, endIndex)

      if (filtered.length > maxPoints) {
        const k = Math.pow(2, Math.ceil(Math.log2(filtered.length / maxPoints)))
        return filtered.filter((_, i) => (i + startIndex) % k === 0)
      }

      return filtered
    }
  }))
)(({ zoomConstraint, setZoomConstraint, getData, getEntireDomain, type, ...props }) => {
  const Preset = presets[type]
  const VictoryContainer: React.ComponentType<
    VictoryZoomContainerProps & VictoryCursorContainerProps
  > = createContainer('zoom', 'cursor')

  return (
    <Preset>
      {({ render, data }) => {
        const domain = getEntireDomain(data)

        if (!zoomConstraint) {
          setZoomConstraint(gx(domain))
          return null
        }

        return (
          <aside>
            <VictoryChart
              theme={victoryTheme}
              domain={domain}
              containerComponent={
                <VictoryContainer
                  zoomDimension="x"
                  onZoomDomainChange={d => setZoomConstraint(gx(d))}
                  cursorLabel={d => `${Math.round(d.x)}, ${Math.round(d.y)}`}
                  cursorLabelComponent={
                    <VictoryLabel
                      style={{
                        fontSize: 9,
                        fontFamily: fonts.family.copy
                      }}
                    />
                  }
                />
              }
              {...props}>
              <VictoryAxis />
              <VictoryAxis dependentAxis />
              {render(getData(data))}
            </VictoryChart>
          </aside>
        )
      }}
    </Preset>
  )
})

const gx = (d: DomainPropType): DomainPropType => ('x' in d ? d.x : d[0])
