import { VictoryLine } from 'victory'

import { Container, DynamicChart, Title } from '.'

export default ({ children, ...props }: DynamicChart) => (
  <Container>
    <Title title="Avg. Sentiment" num={0.7} perc={10} />
    {children(newData => <VictoryLine data={newData} {...props} />)}
  </Container>
)
