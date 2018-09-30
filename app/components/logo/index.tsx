import { darken } from 'polished'
import styled from 'styled-components'

export default () => <Logo>Baphometric</Logo>

const Logo = styled.h1`
  display: block;
  color: ${({ theme }) => theme.colours.brand.colour};
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  text-align: center;
  text-shadow: 1px 1px 0px ${({ theme }) => darken(0.05, theme.colours.brand.bg)};
  margin: 0;
  padding: var(--pad) calc(var(--pad) * 2);
  background: ${({ theme }) => theme.colours.brand.bg};

  header & {
    padding-left: 0;
    padding-right: 0;
  }
`
