import styled from 'styled-components'
import Add from './add'
import Nav from './nav'

const Sidebar = styled.aside`
width: 200px;
padding: calc(var(--grid) * 3) 0;
background: rgba(0,0,0,.2);
`

export default ({ query }) => (
  <Sidebar>
    <div style={{ zIndex: 10, position: 'sticky', top: 27 }}>
      <Add />
      <Nav {...query} />
    </div>
  </Sidebar>
)
