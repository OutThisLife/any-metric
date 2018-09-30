import activeClass from '@/lib/activeClass'
import Link, { LinkState } from 'next/link'
import { RouterProps, withRouter } from 'next/router'
import styled from 'styled-components'

interface TInner extends LinkState {
  router?: RouterProps
  className?: string
}

export default withRouter(({ children, href, as = href, router, ...props }: TInner) => (
  <Link href={href} as={as} passHref>
    <A
      rel={'target' in props ? 'noopener noreferrer' : 'preload'}
      className={typeof href !== 'string' ? activeClass(router.query.slug === href.query?.slug) : ''}
      {...props}>
      {children}
    </A>
  </Link>
))

const A = styled.a`
  color: ${({ theme }) => theme.colours.secondary};
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
      color: ${({ theme }) => theme.colours.secondary};
      text-decoration: none;
    }
  }
`
