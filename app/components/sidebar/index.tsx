import styled from 'styled-components'

import Add from './add'
import Nav from './nav'

const Sidebar = styled.aside`
padding: var(--pad);
background: rgba(0,0,0,.2);
`

export default props => (
  <Sidebar>
    <Add {...props} />
    <Nav {...props} />
  </Sidebar>
)
