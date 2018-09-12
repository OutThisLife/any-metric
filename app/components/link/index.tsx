import Link, { LinkState } from 'next/link'
import styled from 'styled-components'

export default ({ children, href, as = href, ...props }: LinkState) => (
  <Link href={href} as={as} passHref>
    <A {...props} rel={'target' in props ? 'noopener noreferrer' : 'preload'}>
      {children}
    </A>
  </Link>
)

const A = styled.a`
  color: ${({ theme }) => theme.links.colour};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

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
      color: ${({ theme }) => theme.links.colour};
      text-decoration: none;
    }
  }
`
