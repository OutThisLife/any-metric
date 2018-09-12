import Item from '@/components/sidebar/item'
import { lorem } from 'faker'
import styled from 'styled-components'

import Group from './group'

export default () => (
  <Sidebar>
    <nav>
      <Group title="Barcode Scanners">
        <Item href={lorem.slug()} status="unread" title="DataMan 8050" count={10} />
        <Item href={lorem.slug()} title="DataMan 8050" count={5} />
        <Item href={lorem.slug()} title="DataMan 8050" count={9} />
        <Item href={lorem.slug()} title="DataMan 8050" count={5} />
      </Group>

      <Group title="Another Group">
        <Item href={lorem.slug()} status="unread" title="ManData 8050" count={5} />
        <Item href={lorem.slug()} status="unread" title="ManData 8050" count={11} />
        <Item href={lorem.slug()} title="ManData 8050" count={5} />
      </Group>
    </nav>
  </Sidebar>
)

const Sidebar = styled.aside`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  border-right: 1px solid ${({ theme }) => theme.sidebar.border};
  background: ${({ theme }) => theme.sidebar.bg};

  nav {
    padding: var(--pad) 0;
  }
`
