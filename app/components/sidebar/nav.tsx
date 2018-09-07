import gql from 'graphql-tag'
import Link from 'next/link'
import { RouterProps, withRouter } from 'next/router'
import { graphql } from 'react-apollo'
import compose from 'recompose/compose'
import styled from 'styled-components'

export interface Item {
  id: number
  url: string
  title: string
  spider: string
}

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
  query items {
    Item {
      id
      url
      title
      spider
    }
  }
  `)
)(({ router: {query }, data }) => (
  <nav>
    <Link href="/">
      <A className={!query.id ? 'active' : ''}>
        /index
      </A>
    </Link>

    {!data.loading && (data.items || []).map(({ id, url, title, spider }) => (
      <Link key={id} href={`/?page=report&id=${id}`}>
        <A className={id.toString() === query.id ? 'active' : ''}>
          {title || url} ({spider.length})
        </A>
      </Link>
    ))}
  </nav>
))

const A = styled.a`
display: flex;
align-items: center;
color: var(--text);
line-height: 1;
padding: 15px 25px;

&.active {
  color: var(--text);
  background: var(--primary);

  em {
    color: var(--text);
  }
}

&:not(.active):hover {
  transition: none;
  background: rgba(253, 0, 55, .04);
}

&:hover:active {
  outline: 1px solid var(--primary);
  outline-offset: -3px;
}

[data-glyph="trash"] {
  margin-left: auto;
}

&:not(:hover) [data-glyph="trash"] {
  opacity: 0;
}
`
