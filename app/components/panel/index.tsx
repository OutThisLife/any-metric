import { Card } from 'evergreen-ui'
import styled from 'styled-components'

export default styled(props => <Card elevation={2} {...props} />)`
  position: relative;
  height: auto;
  background: ${({ theme }) => theme.colours.bg};
`
