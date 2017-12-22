import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'
import Icon from '@/components/common/icon'

const A = styled.a`
display: flex;
align-items: center;
color: var(--text);
line-height: 1;
padding: 15px 25px;

&.active {
  color: var(--text);
  background: var(--primary);

  em {
    color: var(--text);
  }
}

&:not(.active):hover {
  transition: none;
  background: rgba(253, 0, 55, .04);
}

&:hover:active {
  outline: 1px solid var(--primary);
  outline-offset: -3px;
}

[data-glyph="trash"] {
  margin-left: auto;
}

&:not(:hover) [data-glyph="trash"] {
  opacity: 0;
}
`

export default ({ query, data, handle }) => (
  <nav>
    <Link href='/'>
      <A className={!query.id ? 'active' : ''}>
        /index
      </A>
    </Link>

    {data.map(({ id, url, title, spider }) => (
      <Link key={id} href={`/?page=report&id=${id}`}>
        <A className={id.toString() === query.id ? 'active' : ''}>
          {title || url} ({spider.length})

          <Icon
            i='trash'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()

              const idx = data.findIndex(d => d.id === id)
              data.splice(idx, 1)

              handle(data, () => Router.push('/'))
            }}
          />
        </A>
      </Link>
    ))}
  </nav>
)
