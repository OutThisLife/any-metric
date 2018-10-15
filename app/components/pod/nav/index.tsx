import Button from '@/components/button'

import Nav from './style'

interface TOutter {
  filterData: (t: string) => void
  active?: string
  tags: string[]
}

export default ({ tags, active, filterData }: TOutter) => (
  <Nav>
    <strong>Labels</strong>

    <a
      href="javascript:;"
      className={!active ? 'active' : ''}
      onClick={() => filterData('')}>
      All Results
    </a>

    {tags.map(t => (
      <a
        key={`tag-${t}`}
        href="javascript:;"
        className={active === t ? 'active' : ''}
        onClick={() => filterData(t)}
        dangerouslySetInnerHTML={{ __html: t }}
      />
    ))}

    <Button title="Create Filter" />
  </Nav>
)
