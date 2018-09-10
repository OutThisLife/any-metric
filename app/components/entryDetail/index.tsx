import faker from 'faker'
import styled from 'styled-components'

interface TInner {
  title: string
}

export default ({ title }: TInner) => (
  <EntryDetail>
    <h2>{title}</h2>

    {[...Array(15).keys()].map(i => (
      <p key={`f-${i}`}>{faker.lorem.paragraph()}</p>
    ))}
  </EntryDetail>
)

const EntryDetail = styled.section`
  padding: calc(var(--pad) * 2);
  border-radius: 2px;
  min-height: 100%;
  background: ${({ theme }) => theme.colours.bg};

  h2 {
    margin: 0;
  }
`
