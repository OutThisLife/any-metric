import gql from 'graphql-tag'
import Link from 'next/link'
import { RouterProps, withRouter } from 'next/router'
import { graphql } from 'react-apollo'
import compose from 'recompose/compose'
import styled from 'styled-components'

interface TInner {
  router: RouterProps,
  data: {
    loading: boolean
    items?: Item[]
  }
}

export default compose<TInner, {}>(
  withRouter,
  graphql(gql`
  {
    history {
      id
      url
      data
    }
  }
  `)
)(({ router: { query }, data: { loading = true, items = [] } }) => (
  <nav>
    <Link href="/">
      <A className={!query.id ? 'active' : ''}>
        Overview
      </A>
    </Link>

    {!loading && items.map(({ id, hostname, url, data }) => (
      <Link key={id} href={`/?page=report&id=${id}`}>
        <A className={id.toString() === query.id ? 'active' : ''}>
          <img src={`//${hostname}/favicon.ico`} width={16} height={16} />
          {url} ({data.length})
        </A>
      </Link>
    ))}
  </nav>
))

const A = styled.a`

`
