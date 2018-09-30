import Logo from '@/components/logo'
import styled from 'styled-components'

export default () => (
  <Header>
    <nav>
      thinking.
    </nav>

    <Logo />
  </Header>
)

const Header = styled.header`
  background: ${({ theme }) => theme.colours.base};

  nav {
    color: ${({ theme }) => theme.colours.bg};
    padding: var(--pad);
  }
`
