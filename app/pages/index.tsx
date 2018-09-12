import DataTable from '@/components//dataTable'
import EntryDetail from '@/components/entryDetail'
import { commerce, internet, lorem, random } from 'faker'
import { RouterProps, withRouter } from 'next/router'
import SplitPane from 'react-split-pane'
import { compose } from 'recompose'
import styled from 'styled-components'

interface TInner {
  router: RouterProps
}

export default compose<TInner, {}>(withRouter)(({ router: { query = {} } }) => (
  <Home>
    <SplitPane key={query.slug} split="vertical" defaultSize="66%">
      <section>
        <DataTable
          pageSize={25}
          data={[...Array(255).keys()].map(i => ({
            id: random.uuid(),
            slug: lorem.slug(),
            status: i < 2 ? 'unread' : 'read',
            price: commerce.price(),
            title: commerce.productName(),
            image: internet.avatar(),
            date: new Date().toString()
          }))}
        />
      </section>

      <section>
        {query.id && <EntryDetail title="DataMan 8050" />}
      </section>
    </SplitPane>
  </Home>
))

const Home = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 100%;

  .Pane > section {
    height: 100%;
    overflow: auto;
  }
`
