import Button from '@/components/button'
import Title from '@/components/pod/title/style'
import { Heading, Menu, Popover, Position, Text } from 'evergreen-ui'
import { func } from 'prop-types'
import { compose, getContext, setDisplayName } from 'recompose'

import { DataTableFilter } from '../'
import AddNew from './addNew'

interface TOutter {
  title: string
}
interface TInner {
  filter: DataTableFilter
  showStats: boolean
  toggleStats: () => void
}

export default compose<TInner & TOutter, TOutter>(
  setDisplayName('pod-title'),
  getContext({ filter: func })
)(({ title }) => (
  <Title>
    <div className="drag-h" />

    <div>
      <Heading size={800} is="h2">
        {title}
      </Heading>

      <nav>
        <Popover
          position={Position.BOTTOM_RIGHT}
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item icon="cog">Edit Targets&hellip;</Menu.Item>
                <Menu.Item icon="circle-arrow-right">Move&hellip;</Menu.Item>
                <Menu.Item icon="edit" secondaryText="⌘R">
                  Rename&hellip;
                </Menu.Item>
              </Menu.Group>

              <Menu.Divider />

              <Menu.Group>
                <Menu.Item icon="trash" intent="danger">
                  Delete&hellip;
                </Menu.Item>
              </Menu.Group>
            </Menu>
          }>
          <Button
            href="javascript:;"
            icon="more"
            data-tip="Settings"
            appearance="minimal"
          />
        </Popover>
      </nav>
    </div>

    <div>
      <Text is="small" color="muted" size={300}>
        Updated&nbsp;
        <time>
          6 hours ago, next update in&nbsp;
          <AddNew position={Position.BOTTOM_LEFT} variant="select">
            {({ getRef, toggle }) => (
              <strong
                ref={getRef}
                onClick={toggle}
                style={{ cursor: 'pointer', borderBottom: '1px dotted' }}>
                15 minutes
              </strong>
            )}
          </AddNew>
        </time>
      </Text>
    </div>
  </Title>
))
