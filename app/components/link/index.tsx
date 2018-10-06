import activeClass from '@/lib/activeClass'
import Link, { LinkState } from 'next/link'
import { RouterProps, withRouter } from 'next/router'
import { compose, setDisplayName } from 'recompose'

import A from './style'

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

export default compose<TInner, TOutter>(
  withRouter,
  setDisplayName('baph-link')
)(({ children, href, as = href, router, ...props }) => (
  <Link href={href} as={as} passHref>
    <A
      rel={'target' in props ? 'noopener noreferrer' : 'preload'}
      className={activeClass(router.query.slug === href.query.slug)}
      {...props}>
      {children}
    </A>
  </Link>
))
