import Link from 'next/link'
import styled from 'styled-components'
import Icon from '@/components/common/icon'

const A = styled.a`
display: flex;
align-items: center;
padding: 15px 25px;
color: var(--text);

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

svg {
  width: 10px;
  fill: #FFF;
  margin-right: auto;
}
`

export default ({ query, data, handle }) => (
  <nav>
    <Link href='/'>
      <A>/index</A>
    </Link>

    {(data || []).map(({ id, url, title, spider }) => (
      <Link key={id} href={`/?page=report&id=${id}`}>
        <A className={id.toString() === query.id ? 'active' : ''}>
          {title || url} ({spider.length})

          <Icon
            i='trash'
            onClick={() => {
              const idx = data.findIndex(d => d.id === id)
              delete data[idx]
              handle(data)
            }}
          />
        </A>
      </Link>
    ))}
  </nav>
)
