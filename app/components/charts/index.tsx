import { Presets } from '@/components/charts/presets'
import { fonts, victoryTheme } from '@/theme'
import { last, maxBy, minBy } from 'lodash'
import dynamic from 'next/dynamic'
import { compose, onlyUpdateForKeys, setDisplayName, withHandlers, withProps, withState } from 'recompose'
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
  data?: any[]
  type?: keyof Presets
  domain?: DomainPropType
}

interface TState {
  zoomConstraint: DomainPropType
  setZoomConstraint: (a: DomainPropType) => DomainPropType
}

interface THandles {
  getData: () => any[]
}

const presets: Presets = {
  Sentiment: dynamic(import('./presets/sentiment').then(m => m.default)),
  Volume: dynamic(import('./presets/volume').then(m => m.default))
}

export default compose<THandles & TState & TOutter, TOutter>(
  setDisplayName('chart-generator'),
  withProps<TOutter, TOutter>(({ data }) => ({
    domain: data.length
      ? {
          x: [data[0].x, last(data).x],
          y: [minBy(data, d => d.y).y, maxBy(data, d => d.y).y]
        }
      : { x: [0, 0], y: [0, 0] }
  })),
  withState('zoomConstraint', 'setZoomConstraint', ({ domain }) => gx(domain)),
  withHandlers<TOutter & TState, THandles>(() => ({
    getData: ({ data, zoomConstraint }) => () => {
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
  })),
  onlyUpdateForKeys(['zoomConstraint', 'data'])
)(({ zoomConstraint, setZoomConstraint, domain, getData, type, ...props }) => {
  const Preset = presets[type]
  const VictoryContainer: React.ComponentType<
    VictoryZoomContainerProps & VictoryCursorContainerProps
  > = createContainer('zoom', 'cursor')

  return (
    <Preset>
      {render => (
        <aside>
          <VictoryChart
            theme={victoryTheme}
            domain={domain}
            containerComponent={
              <VictoryContainer
                zoomDimension="x"
                onZoomDomainChange={d => setZoomConstraint(gx(d))}
                cursorLabel={d => `${Math.round(d.x)}, ${Math.round(d.y)}`}
                events={{
                  onDoubleClick: () => setZoomConstraint(gx(domain)) && null
                }}
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
            {render(getData())}
          </VictoryChart>
        </aside>
      )}
    </Preset>
  )
})

const gx = (d: DomainPropType): DomainPropType => ('x' in d ? d.x : d[0])
const gy = (d: DomainPropType): DomainPropType => ('y' in d ? d.y : d[1])
