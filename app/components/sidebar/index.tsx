import Link from '@/components/link'
import activeClass from '@/lib/activeClass'
import { commerce, lorem, random, seed } from 'faker'
import { RouterProps, withRouter } from 'next/router'
import { compose } from 'recompose'
import styled from 'styled-components'

seed(100)
const data = [...Array(4).keys()].map(() => ({
  title: commerce.productName(),
  slug: lorem.slug(),
  qty: random.number(50)
}))

interface TInner {
  router: RouterProps
}

export default compose<TInner, {}>(withRouter)(({ router: { query } }) => (
  <Sidebar>
    {data.map(({ title, slug, qty }) => (
      <Link
        key={`link-${slug}`}
        prefetch
        href={{ pathname: '/', query: { slug } }}
        as={`/${slug}`}
        className={activeClass(query.slug === slug)}>
        <span>
          {title}
          <em>({qty})</em>
        </span>
      </Link>
    ))}
  </Sidebar>
))

const Sidebar = styled.aside`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: var(--pad);
  border-right: 1px solid ${({ theme }) => theme.sidebar.border};
  background: ${({ theme }) => theme.sidebar.bg};

  a {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.sidebar.link.colour};
    padding: calc(var(--pad) / 4) 0;

    &:not(.active):hover {
      color: ${({ theme }) => theme.sidebar.link.hover.colour};
    }

    &.active {
      color: ${({ theme }) => theme.links.colour};
      font-weight: 700;
    }

    svg {
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
    }

    span {
      display: inline-block;

      em {
        font-style: normal;
        margin-left: 4px;
      }
    }
  }
`
