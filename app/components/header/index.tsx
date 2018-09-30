import Logo from '@/components/logo'
import styled from 'styled-components'

export default () => (
  <Header>
    <Logo />

    <nav>
      thinking.
    </nav>
  </Header>
)

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colours.bg};
  }
`
