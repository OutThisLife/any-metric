import styled from 'styled-components'

import Add from './add'
import Nav from './nav'

const Sidebar = styled.aside`
width: 200px;
padding: calc(var(--grid) * 3) 0;
background: rgba(0,0,0,.2);

> div {
  z-index: 10;
  position: sticky;
  top: 27px;
}
`

export default props => (
  <Sidebar>
    <div>
      <Add {...props} />
      <Nav {...props} />
    </div>
  </Sidebar>
)
