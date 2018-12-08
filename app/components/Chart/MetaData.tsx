import { BaphoTheme } from '@/theme'
import * as d3 from 'd3'
import {
  OHLCTooltip,
  ToolTipText,
  ToolTipTSpanLabel
} from 'react-stockcharts/lib/tooltip'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

export default compose<BaphoTheme, {}>(
  setDisplayName('chart-metadata'),
  withTheme
)(({ theme }) => (
  <OHLCTooltip
    accessor={d => d}
    origin={[-30, -15]}
    fontSize={9}
    textFill={theme.colours.muted}
    labelFill={theme.colours.label}
    xDisplayFormat={d3.timeFormat('%Y-%m-%d')}
    volumeFormat={d3.format('.4s')}
    percentFormat={d3.format('.2%')}
    displayTexts={{
      d: 'Date: ',
      c: ' P:',
      v: ' V:',
      na: ' N/A '
    }}
    children={(p, _, d) => (
      <g
        className={`react-stockcharts-tooltip-hover ${p.className}`}
        transform={`translate(${d.x}, ${d.y})`}
        onClick={p.onClick}>
        <ToolTipText
          x={0}
          y={0}
          fontFamily={p.fontFamily}
          fontSize={p.fontSize}>
          <ToolTipTSpanLabel fill={p.labelFill} key="label" x={0} dy={0}>
            {p.displayTexts.d}
          </ToolTipTSpanLabel>
          <tspan key="value" fill={p.textFill}>
            {d.displayDate}
          </tspan>

          <ToolTipTSpanLabel fill={p.labelFill} key="label_C">
            {p.displayTexts.c}
          </ToolTipTSpanLabel>
          <tspan key="value_C" fill={p.textFill}>
            {d.close}
          </tspan>

          <ToolTipTSpanLabel fill={p.labelFill} key="label_Vol">
            {p.displayTexts.v}
          </ToolTipTSpanLabel>
          <tspan key="value_Vol" fill={p.textFill}>
            {d.volume}
          </tspan>
        </ToolTipText>
      </g>
    )}
  />
))
