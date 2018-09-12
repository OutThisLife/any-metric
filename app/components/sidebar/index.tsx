import Link from '@/components/link'
import activeClass from '@/lib/activeClass'
import { commerce, lorem, random, seed } from 'faker'
import { RouterProps, withRouter } from 'next/router'
import { rgba } from 'polished'
import { FiInbox, FiStar } from 'react-icons/fi'
import { compose } from 'recompose'
import styled from 'styled-components'

import Group from './group'

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
    <nav>
      <Link href="/" className={activeClass(!query.slug)}>
        <>
          <FiInbox /> Overview
        </>
      </Link>

      <Link
        href={{ pathname: '/', query: { slug: 'favs' } }}
        as="/favs"
        className={activeClass(query.slug === 'favs')}>
        <>
          <FiStar /> Starred
        </>
      </Link>
    </nav>

    <nav>
      <Group title="Barcode Scanners">
        {data.map(({ title, slug, qty }) => (
          <Link
            key={`link-${slug}`}
            href={{ pathname: '/', query: { slug } }}
            as={`/${slug}`}
            prefetch
            className={activeClass(query.slug === slug)}>
            <>
              <i />

              <span>
                {title}
                <em>({qty})</em>
              </span>
            </>
          </Link>
        ))}
      </Group>
    </nav>
  </Sidebar>
))

const Sidebar = styled.aside`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  border-right: 1px solid ${({ theme }) => theme.sidebar.border};
  background: ${({ theme }) => theme.sidebar.bg};

  nav {
    padding: var(--pad) 0;

    a {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.sidebar.link.colour};
      text-decoration: none !important;
      padding: calc(var(--pad) / 4) var(--pad);
      border: 1px solid transparent;

      + a {
        border-top-width: 0px;
      }

      &:not(.active):hover {
        color: ${({ theme }) => theme.sidebar.link.hover.colour};
        background: ${({ theme }) => theme.sidebar.link.hover.bg};
      }

      &.active {
        color: ${({ theme }) => theme.links.colour};
        font-weight: 700;
        background: ${({ theme }) => theme.links.active};
      }

      i {
        align-self: baseline;
        display: inline-block;
        vertical-align: middle;
        width: 7px;
        height: 7px;
        border: 1px solid ${({ theme }) => rgba(theme.colours.base, 0.2)};
        transform: translate(0, 7px);
        background: transparent;

        &.unread {
          border-color: ${({ theme }) => theme.colours.success};
          background: ${({ theme }) => theme.colours.success};
        }
      }

      svg {
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
      }

      span {
        display: inline-block;
        width: calc(100% - 7px);
        padding-left: 8px;

        em {
          font-style: normal;
          margin-left: 4px;
        }
      }
    }
  }
`
