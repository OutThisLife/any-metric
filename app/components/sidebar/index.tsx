import styled from 'styled-components'

import Group from './group'
import Link from './link'

export default () => (
  <Sidebar>
    <nav>
      <Group title="Barcode Scanners">
        <Link href="javascript:;" status="unread" title="DataMan 8050" count={10} />
        <Link href="javascript:;" title="DataMan 8050" count={5} />
        <Link href="javascript:;" title="DataMan 8050" count={9} />
        <Link href="javascript:;" title="DataMan 8050" count={5} />
      </Group>

      <Group title="Another Group">
        <Link href="javascript:;" status="unread" title="ManData 8050" count={5} />
        <Link href="javascript:;" status="unread" title="ManData 8050" count={11} />
        <Link href="javascript:;" title="ManData 8050" count={5} />
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
