import LineChart from 'react-svg-line-chart'
import { defaultProps } from 'recompose'
import styled from 'styled-components'

export default defaultProps<{ [key: string]: any }>({
  pathColor: '#FD0037',
  pathWidth: 1,
  pathSmoothing: 0,
  labelsColor: 'rgba(255,255,255,.2)',
  labelsCharacterWidth: 1,
  pointsVisible: false,
  areaVisible: false,
  gridVisible: false,
  axisVisible: false,
})(props => (
  <Chart>
    <LineChart {...props} />
  </Chart>
))

const Chart = styled.figure`
user-select: none;
margin: 25px;

svg {
  width: 100%;
  height: auto;
}
`
