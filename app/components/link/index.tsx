import activeClass from '@/lib/activeClass'
import Link, { LinkState } from 'next/link'
import { RouterProps, withRouter } from 'next/router'
import { compose } from 'recompose'
import styled, { css } from 'styled-components'

interface TOutter extends LinkState {
  className?: string
}

interface TInner extends TOutter {
  router: RouterProps
  href: {
    query: {
      slug: string
    }
  }
}

export default compose<TInner, TOutter>(withRouter)(({ children, href, as = href, router, ...props }) => (
  <Link href={href} as={as} passHref>
    <A
      rel={'target' in props ? 'noopener noreferrer' : 'preload'}
      className={activeClass(router.query.slug === href.query.slug)}
      {...props}>
      {children}
    </A>
  </Link>
))

const A = styled.a`
  ${({ theme }) => css`
    color: ${theme.colours.secondary};
    text-decoration: none;

    i,
    svg {
      vertical-align: middle;
    }

    h1 &,
    h2 &,
    h3 &,
    h4 &,
    h5 & {
      color: inherit;

      &:hover {
        color: ${theme.colours.secondary};
        text-decoration: none;
      }
    }
  `};
`
