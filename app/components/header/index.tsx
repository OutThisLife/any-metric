import styled from 'styled-components'

import Add from './add'

export default () => (
  <Header>
    <Add />
    <h1>baphometric</h1>
  </Header>
)

const Header = styled.header`
  z-index: 100;
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--pad);
  border-bottom: 1px solid ${({ theme }) => theme.header.border};
  background: ${({ theme }) => theme.header.bg};

  > h1 {
    color: ${({ theme }) => theme.fonts.brand.colour};
    font: 700 13px/1 ${({ theme }) => theme.fonts.brand.family};
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin: 0 0 0 auto;
  }
`
