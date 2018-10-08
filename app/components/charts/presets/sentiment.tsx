import { VictoryBoxPlot } from 'victory'

import { Container, Title } from '.'

interface TOutter {
  children: (a: JSX.Element) => JSX.Element
}

export default ({ children }: TOutter) => (
  <Container>
    <Title title="Avg. Sentiment" num={0.7} perc={10} />

    {children(
      <VictoryBoxPlot
        boxWidth={20}
        data={[
          { x: 1, y: [1, 2, 3, 5] },
          { x: 2, y: [3, 2, 8, 10] },
          { x: 3, y: [2, 8, 6, 5] },
          { x: 4, y: [1, 3, 2, 9] }
        ]}
      />
    )}
  </Container>
)
