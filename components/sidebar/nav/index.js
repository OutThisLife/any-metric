import Link from 'next/link'
import styled from 'styled-components'

const Nav = styled.nav`
a {
  display: block;
  padding: 15px 25px;
  color: var(--text);
  border: solid rgba(255,255,255,.1);
  border-width: 1px 0;

  &:not(.active) {
    opacity: 0.2;

    &:hover {
      opacity: 0.5;
      background: rgba(0,0,0,.4);
    }

    &:not(:hover) {
      border-top-color: transparent;
    }
  }

  &.active {
    color: var(--text);
    font-weight: 700;
    background: var(--primary);
  }

  em {
    display: inherit;
    max-width: 100%;
    overflow: hidden;
    color: var(--text);
    font-size: 11px;
    text-overflow: ellipsis;
  }
}
`

export default ({ id }) => (
  <Nav>
    <Link href='/?page=report&id=1'>
      <a className={id === '1' ? 'active' : ''}>
        Some Product Title
        <em>//amazon.com/path/to/product/page</em>
      </a>
    </Link>

    <Link href='/?page=report&id=2'>
      <a className={id === '2' ? 'active' : ''}>
        Some Product Title
        <em>//amazon.com/path/to/product/page</em>
      </a>
    </Link>

    <Link href='/?page=report&id=3'>
      <a className={id === '3' ? 'active' : ''}>
        Some Product Title
        <em>//amazon.com/path/to/product/page</em>
      </a>
    </Link>

    <Link href='/?page=report&id=4'>
      <a className={id === '4' ? 'active' : ''}>
        Some Product Title
        <em>//amazon.com/path/to/product/page</em>
      </a>
    </Link>

    <Link href='/?page=report&id=5'>
      <a className={id === '5' ? 'active' : ''}>
        Some Product Title
        <em>//amazon.com/path/to/product/page</em>
      </a>
    </Link>
  </Nav>
)
