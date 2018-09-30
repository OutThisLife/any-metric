import Link from '@/components/link'
import activeClass from '@/lib/activeClass'
import { commerce, lorem, random, seed } from 'faker'
import { RouterProps, withRouter } from 'next/router'
import { rgba } from 'polished'
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
    <div>
      {data.map(({ title, slug }) => (
        <Link
          key={`link-${slug}`}
          prefetch
          href={{ pathname: '/', query: { slug } }}
          as={`/${slug}`}
          className={activeClass(query.slug === slug)}>
          <span>{title}</span>
        </Link>
      ))}
    </div>
  </Sidebar>
))

const Sidebar = styled.aside`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: var(--pad);
  background: ${({ theme }) => theme.colours.base};

  > div {
    position: sticky;
    top: 0;
  }

  a {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colours.bg};
    padding: calc(var(--pad) / 2) var(--pad);
    border-radius: 4px;

    + a {
      margin-top: calc(var(--pad) / 2);
    }

    &.active {
      color: ${({ theme }) => theme.colours.bg};
      background: ${({ theme }) => rgba(theme.colours.bg, 0.1)};
    }

    &:hover:not(.active) {
      background: ${({ theme }) => rgba(theme.colours.bg, 0.05)};
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
