import styled from 'styled-components'
import Add from './add'
import Nav from './nav'

const Sidebar = styled.aside`
width: 200px;
padding: calc(var(--grid) * 3) 0;
border-right: 1px solid rgba(255,255,255,.1);
background: rgba(0,0,0,.3);
`

export default ({ query }) => (
  <Sidebar>
    <div style={{ position: 'sticky', top: 27 }}>
      <Add />
      <Nav {...query} />
    </div>
  </Sidebar>
)
