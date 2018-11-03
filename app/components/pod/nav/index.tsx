import Button from '@/components/button'
import AddNew from '@/components/header/addNew'
import { autoColour } from '@/theme'
import { Icon, SidebarTab, Tablist } from 'evergreen-ui'
import { func, string } from 'prop-types'
import { IoMdFunnel } from 'react-icons/io'
import {
  compose,
  getContext,
  mapProps,
  onlyUpdateForKeys,
  setDisplayName
} from 'recompose'

import { DataTableFilter } from '../'
import Nav from './style'

interface TOutter {
  tags: string[]
}

interface TInner {
  current: string
  filter: DataTableFilter
}

export default compose<TInner & TOutter, TOutter>(
  setDisplayName('nav'),
  getContext({ current: string }),
  onlyUpdateForKeys(['current', 'tags']),
  mapProps(({ tags = [], ...props }) => ({
    ...props,
    tags: tags.filter((t, i, self) => t && self.indexOf(t) === i)
  })),
  getContext({ filter: func })
)(({ current, filter, tags, ...props }) => (
  <Nav {...props}>
    <Tablist>
      <SidebarTab
        key="all"
        height={20}
        isSelected={!current}
        onSelect={() => filter({ value: '', action: 'RESET' })}>
        All Results
      </SidebarTab>

      {tags.map(t => (
        <SidebarTab
          key={`tag-${t}`}
          height={20}
          isSelected={current === t}
          onClick={() =>
            filter({
              value: t,
              action: 'TAG'
            })
          }>
          <Icon
            icon="ring"
            color={autoColour(t, true).backgroundColor}
            size={8}
          />
          {t}
        </SidebarTab>
      ))}
    </Tablist>

    <br />

    <AddNew>
      <Button title="New Label" iconBefore={<IoMdFunnel />} />
    </AddNew>
  </Nav>
))
