import DataTable from '@/components//dataTable'
import Link from '@/components/link'
import styled from 'styled-components'

interface TInner {
  title: string
}

export default ({ title }: TInner) => (
  <DataGroup>
    <h2>
      <Link href="#">{title}</Link>
    </h2>

    <DataTable />
  </DataGroup>
)

const DataGroup = styled.section`
  padding: var(--pad);
  border-radius: 2px;
  background: ${({ theme }) => theme.colours.bg};

  + section {
    margin-top: var(--pad);
  }

  h2 {
    z-index: 1;
    position: relative;
    margin: 0;
  }
`
