import styled from 'styled-components'

export default () => <Logo>Baphometric</Logo>

const Logo = styled.h1`
  display: inline-block;
  color: ${({ theme }) => theme.colours.brand.colour};
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  margin: 0;
  padding: var(--pad) calc(var(--pad) * 2);
  background: ${({ theme }) => theme.colours.brand.bg};
`
