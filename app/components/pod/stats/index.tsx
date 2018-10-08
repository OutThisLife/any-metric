import Chart from '@/components/charts'
import { random } from 'faker'

import Stats from './style'

const data = [...Array(200).keys()].map(x => ({
  x,
  y: random.number(20)
}))

export default () => (
  <Stats>
    <Chart type="Sentiment" data={data} />
    <Chart type="Volume" data={data} />
  </Stats>
)
