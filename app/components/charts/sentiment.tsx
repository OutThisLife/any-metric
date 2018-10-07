import { colours } from '@/theme'
import { ResponsiveLine as Line } from '@nivo/line'

import Charts from './style'
import Title from './title'

export default () => (
  <Charts>
    <Title title="Avg. Sentiment" num={0.7} perc={10} />

    <Line
      animate={false}
      margin={{
        top: 20,
        right: 20,
        bottom: 60,
        left: 30
      }}
      data={[
        {
          id: 'positive',
          data: [
            { x: 0, y: 0.7 },
            { x: 1, y: 0.9 },
            { x: 2, y: 0.8 },
            { x: 3, y: 0.6 },
            { x: 4, y: 0.3 },
            { x: 5, y: 0 },
            { x: 6, y: null },
            { x: 7, y: null },
            { x: 8, y: null },
            { x: 9, y: null },
            { x: 10, y: null },
            { x: 11, y: 0 },
            { x: 12, y: 0.4 },
            { x: 13, y: 0.6 },
            { x: 14, y: 0.5 },
            { x: 15, y: 0.3 },
            { x: 16, y: 0.4 },
            { x: 17, y: 0 }
          ]
        },
        {
          id: 'negative',
          data: [
            { x: 5, y: 0 },
            { x: 6, y: -0.3 },
            { x: 7, y: -0.5 },
            { x: 8, y: -0.9 },
            { x: 9, y: -0.2 },
            { x: 10, y: -0.4 },
            { x: 11, y: 0 },
            { x: 12, y: null },
            { x: 13, y: null },
            { x: 14, y: null },
            { x: 15, y: null },
            { x: 16, y: null },
            { x: 17, y: 0 },
            { x: 18, y: -0.4 },
            { x: 19, y: -0.2 },
            { x: 20, y: -0.1 },
            { x: 21, y: -0.6 }
          ]
        }
      ]}
      animate
      curve="monotoneX"
      dotSymbol={({ size, color, borderWidth, borderColor }) => (
        <g>
          <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
          <circle r={size / 5} strokeWidth={borderWidth} stroke={borderColor} fill={color} fillOpacity={0.35} />
        </g>
      )}
      dotSize={14}
      dotBorderWidth={1}
      dotBorderColor="inherit:darker(0.3)"
      dotLabelYOffset={-20}
      enableGridX={false}
      colors={[colours.good, colours.bad]}
      xScale={{ type: 'linear' }}
      yScale={{
        type: 'linear',
        stacked: false,
        min: -1,
        max: 1
      }}
      enableArea
      areaOpacity={0.07}
    />
  </Charts>
)
