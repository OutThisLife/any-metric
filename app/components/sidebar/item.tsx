import NextLink from '@/components/link'
import { rgba } from 'polished'
import { AnchorHTMLAttributes } from 'react'
import styled from 'styled-components'

interface TInner {
  status?: 'read' | 'unread'
  count?: number
}

export default ({ href, status = 'read', title, count }: AnchorHTMLAttributes<any> & TInner) => (
  <Link href={{ pathname: '/', query: { slug: href }}} as={`/${href}`} prefetch status={status}>
    <i />

    <span>
      {title}
      {count && <em>({count})</em>}
    </span>
  </Link>
)

const Link = styled(NextLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.sidebar.link.colour};
  text-decoration: none;
  padding: calc(var(--pad) / 2) var(--pad);
  border: 1px solid transparent;

  + a {
    border-top-width: 0px;
  }

  &:hover {
    color: ${({ theme }) => theme.sidebar.link.hover.colour};
    background: ${({ theme }) => theme.sidebar.link.hover.bg};
  }

  i {
    display: inline-block;
    vertical-align: middle;
    width: 7px;
    height: 7px;
    border: 1px solid ${({ theme, status }: any) => (status === 'unread' ? '#12a267' : rgba(theme.colours.base, 0.2))};
    background: ${({ status }: any) => (status === 'unread' ? '#12A267' : 'transparent')};
  }

  span {
    display: inline-block;
    width: calc(100% - 7px);
    line-height: 1;
    padding-left: 8px;

    em {
      font-style: normal;
      margin-left: 4px;
    }
  }
` as any
