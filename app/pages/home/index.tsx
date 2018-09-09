import DataTable from '@/components/dataTable'
import Link from '@/components/link'
import styled from 'styled-components'

export default () => (
  <Home>
    <section>
      <h2>
        <Link href="#">DataMan 8050 (3)</Link>
      </h2>

      <DataTable />
    </section>

    <section>
      <h2>
        <Link href="#">DataMan 9355 (3)</Link>
      </h2>

      <DataTable />
    </section>
  </Home>
)

const Home = styled.div`
  > section {
    padding: var(--pad);
    border-radius: 2px;
    background: ${({ theme }) => theme.colours.bg};

    + section {
      margin-top: var(--pad);
    }

    h2 {
      margin: 0;
    }
  }
`
