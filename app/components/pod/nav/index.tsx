import Button from '@/components/button'
import { compose, mapProps, onlyUpdateForKeys } from 'recompose'

import Nav from './style'

interface TOutter {
  tags: string[]
  filterData: (t: string) => void
  active: string
}

export default compose<TOutter, TOutter>(
  onlyUpdateForKeys(['active', 'tags']),
  mapProps(({ tags = [], ...props }) => ({
    ...props,
    tags: tags.filter((t, i, self) => t && self.indexOf(t) === i)
  }))
)(({ active, filterData, tags }) => (
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
))
