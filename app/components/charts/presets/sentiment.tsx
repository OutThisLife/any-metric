import { random } from 'faker'
import { VictoryLine } from 'victory'

import { Container, DynamicChart, Title } from '.'

const data = [...Array(200).keys()].map(x => ({
  x,
  y: random.number(20)
}))

export default ({ children }: DynamicChart) => (
  <Container>
    <Title title="Avg. Sentiment" num={0.7} perc={10} />

    {children({
      data,
      render: newData => <VictoryLine data={newData} />
    })}
  </Container>
)
