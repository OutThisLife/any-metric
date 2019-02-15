import { moneyFormat } from '@/lib/utils'
import * as d3 from 'd3'
import { Chart } from 'react-stockcharts'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  EdgeIndicator
} from 'react-stockcharts/lib/coordinates'
import {
  LineSeries,
  ScatterSeries,
  TriangleMarker
} from 'react-stockcharts/lib/series'
import { compose, setDisplayName } from 'recompose'

import { ChartCVProps, ChartState, MA } from '..'
import ChartCanvas from '../style'
import Tooltip from '../Tooltip'

export default compose<ChartState, ChartCVProps>(setDisplayName('chart-price'))(
  ({
    tickStyle: { fontSize, gridWidth, gridHeight, ...tickStyle },
    ...props
  }) => (
    <ChartCanvas
      seriesName="Price"
      clamp={true}
      mouseMoveEvent={true}
      panEvent={true}
      {...props}>
      <Chart id={1} yExtents={[d => d.close, MA.accessor()]} yPan={false}>
        <ScatterSeries
          yAccessor={d => d.close}
          marker={TriangleMarker}
          markerProps={{
            width: 8,
            r: 2.5,
            fill: 'rgba(0,0,0,.2)',
            stroke: 'rgba(0,0,0,0)'
          }}
        />
        <LineSeries
          yAccessor={d => d.close}
          stroke="rgba(0,0,0,.2)"
          strokeWidth={1}
          strokeDasharray="Dot"
        />
        <LineSeries
          yAccessor={MA.accessor()}
          stroke="#0000ee"
          strokeWidth={2}
          interpolation={d3.curveStep}
        />
        <XAxis
          axisAt="bottom"
          orient="bottom"
          fontSize={fontSize}
          stroke="#A8A8A8"
          tickStroke="#A8A8A8"
          innerTickSize={-1 * gridHeight}
          {...tickStyle}
        />
        <YAxis
          axisAt="left"
          orient="left"
          fontSize={fontSize}
          stroke="#A8A8A8"
          tickStroke="#A8A8A8"
          displayFormat={moneyFormat}
          innerTickSize={-1 * gridWidth}
          {...tickStyle}
        />
        <Tooltip fontSize={fontSize} />}
        <EdgeIndicator
          yAccessor={MA.accessor()}
          itemType="last"
          orient="right"
          edgeAt="right"
          fill="#0000ee"
        />
      </Chart>

      <CrossHairCursor
        snapX={false}
        StrokeDasharray="ShortDashDot"
        stroke="#000"
      />
    </ChartCanvas>
  )
)
