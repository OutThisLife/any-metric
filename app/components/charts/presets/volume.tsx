import { Container, Title } from '.'

interface TOutter {
  children: (a: JSX.Element) => JSX.Element
}

export default ({ children }: TOutter) => (
  <Container>
    <Title title="Volume" num={350} perc={155} />
  </Container>
)
