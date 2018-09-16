import DataTable from '@/components//dataTable'
import EntryDetail from '@/components/entryDetail'
import { commerce, internet, lorem, random, seed } from 'faker'
import { RouterProps, withRouter } from 'next/router'
import SplitPane from 'react-split-pane'
import { compose, shouldUpdate } from 'recompose'
import styled from 'styled-components'

interface TInner {
  router: RouterProps & {
    query: {
      slug?: string
      id?: string
    }
  }
}

export default compose<TInner, {}>(
  withRouter,
  shouldUpdate<TInner>(({ router: { query } }, nextProps) => {
    const nextQuery = nextProps.router.query

    if ('id' in query && 'id' in nextQuery) {
      return query.id !== nextQuery.id
    }

    return query.slug !== nextQuery.slug
  })
)(({ router: { query } }) => {
  const slug = query.slug || '/'
  const key = slug.length

  seed(key)

  return (
    <Home key={JSON.stringify(slug)}>
      <SplitPane split="vertical" defaultSize="66%">
        <section>
          <DataTable
            key={key}
            query={query}
            pageSize={25}
            data={[...Array(255).keys()].map(i => ({
              id: random.uuid(),
              status: i < 2 ? 'unread' : 'read',
              slug: query.slug || lorem.slug(),
              price: commerce.price(),
              title: commerce.productName(),
              copy: lorem.words(),
              image: internet.avatar(),
              date: new Date().toString()
            }))}
          />
        </section>

        <section>
          {query.id ? <EntryDetail key={query.id} title="DataMan 8050" /> : null}
        </section>
      </SplitPane>
    </Home>
  )
})

const Home = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 100%;

  .Pane > section {
    height: 100%;
    overflow: auto;
  }
`
