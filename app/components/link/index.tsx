import Link from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import styled from 'styled-components'

export default ({ children, href, ...props }: AnchorHTMLAttributes<any>) => (
  <Link href={href} passHref>
    <A {...props} rel={'target' in props ? 'noopener noreferrer' : 'alternate'}>{children}</A>
  </Link>
)

const A = styled.a`
  color: ${({ theme }) => theme.links.colour};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  i, svg {
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
