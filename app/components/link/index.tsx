import activeClass from '@/lib/activeClass'
import Link, { LinkState } from 'next/link'
import { RouterProps } from 'next/router'
import { object } from 'prop-types'
import { compose, getContext, setDisplayName } from 'recompose'

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
  setDisplayName('baph-link'),
  getContext({ router: object })
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
