import { Input } from '@/components/input'
import styled from 'styled-components'

export default () => (
  <Header>
    <h1>baphometric</h1>

    <form method="post" action="javascript:;">
      <Input placeholder="URL of search" />
    </form>
  </Header>
)

const Header = styled.header`
  z-index: 100;
  display: grid;
  grid-template-columns: 187px 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  position: relative;
  padding: var(--pad);
  border-bottom: 1px solid ${({ theme }) => theme.header.border};
  background: ${({ theme }) => theme.header.bg};

  > h1 {
    grid-area: 1 / 1;
    color: ${({ theme }) => theme.fonts.brand.colour};
    font: 700 13px/1 ${({ theme }) => theme.fonts.brand.family};
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }

  form {
    grid-area: 1 / 2;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    width: 100%;

    input {
      padding: calc(var(--pad) * 1.25) calc(var(--pad) * 1.3);
      margin-right: calc(var(--pad) * 1.5);
      border-color: transparent;
      background: #F5F5F5;
    }

    button {
      padding-right: calc(var(--pad) * 1.7);

      svg {
        font-size: 2em;
        stroke: ${({ theme }) => theme.links.colour};
        margin-right: calc(var(--pad) / 2);
      }
    }
  }
`
