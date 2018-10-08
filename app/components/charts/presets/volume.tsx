import { Container, DynamicChart, Title } from '.'


export default ({ children }: DynamicChart) => (
  <Container>
    <Title title="Volume" num={350} perc={155} />
  </Container>
)
