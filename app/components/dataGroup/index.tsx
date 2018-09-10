import DataTable from '@/components//dataTable'
import faker from 'faker'
import styled from 'styled-components'

export default () => (
  <DataGroup>
    <DataTable
      pageSize={25}
      data={[...Array(255).keys()].map(i => ({
        status: i < 2 ? 'unread' : 'read',
        price: faker.commerce.price(),
        title: faker.commerce.productName(),
        image: faker.internet.avatar(),
        date: new Date().toString()
      }))}
    />
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
