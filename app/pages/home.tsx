import DataTable from '@/components//dataTable'
import EntryDetail from '@/components/entryDetail'
import faker from 'faker'
import SplitPane from 'react-split-pane'
import styled from 'styled-components'

export default () => (
  <Home>
    <SplitPane split="vertical" defaultSize="66%">
      <section>
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
      </section>

      <section>
        <EntryDetail title="DataMan 8050" />
      </section>
    </SplitPane>
  </Home>
)

const Home = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 100%;

  .Pane > section {
    height: 100%;
    overflow: auto;
  }
`
