import Button from '@/components/button'

import Nav from './style'

interface TOutter {
  onClick: (t: string) => void
  active?: string
  tags: string[]
}

export default ({ tags, active, onClick }: TOutter) => (
  <Nav>
    <a
      href="javascript:;"
      className={!active ? 'active' : ''}
      onClick={() => onClick('')}>
      Everything
    </a>

    {tags.map(t => (
      <a
        key={`tag-${t}`}
        href="javascript:;"
        className={active === t ? 'active' : ''}
        onClick={() => onClick(t)}
        dangerouslySetInnerHTML={{ __html: t }}
      />
    ))}

    <Button title="Create New Tag" />
  </Nav>
)
