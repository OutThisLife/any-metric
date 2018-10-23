import Button from '@/components/button'
import { autoColour } from '@/theme'
import { Icon, SidebarTab, Tablist } from 'evergreen-ui'
import { func } from 'prop-types'
import { IoMdFunnel } from 'react-icons/io'
import { compose, getContext, mapProps, onlyUpdateForKeys } from 'recompose'

import { DataTableFilter } from '../'
import AddNew from './addNew'
import Nav from './style'

interface TOutter {
  tags: string[]
  current: string
}

interface TInner {
  filter: DataTableFilter
}

export default compose<TInner & TOutter, TOutter>(
  onlyUpdateForKeys(['current', 'tags']),
  mapProps(({ tags = [], ...props }) => ({
    ...props,
    tags: tags.filter((t, i, self) => t && self.indexOf(t) === i)
  })),
  getContext({ filter: func })
)(({ current, filter, tags, ...props }) => (
  <Nav as="aside" {...props}>
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
      <Button
        title="Create Filter"
        iconBefore={<IoMdFunnel style={{ marginRight: '.33em' }} />}
      />
    </AddNew>
  </Nav>
))
