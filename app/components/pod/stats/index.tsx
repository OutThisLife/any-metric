import Chart from '@/components/charts'

import Stats from './style'


export default () => (
  <Stats>
    <Chart type="Sentiment" />
    <Chart type="Volume" />
  </Stats>
)
