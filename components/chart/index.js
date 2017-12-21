import styled from 'styled-components'
import LineChart from 'react-svg-line-chart'

const Chart = styled.figure`
user-select: none;
margin: 25px;

svg {
  width: 100%;
  height: auto;
}
`

export default props => (
  <Chart>
    <LineChart
      pathColor='#FD0037'
      pathWidth={1}
      pathSmoothing={0}
      labelsColor='rgba(255,255,255,.2)'
      labelsCharacterWidth={1}
      pointsVisible={false}
      areaVisible={false}
      gridVisible={false}
      axisVisible={false}
      {...props}
    />
  </Chart>
)
