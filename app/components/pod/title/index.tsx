import Button from '@/components/button'
import Title from '@/components/pod/title/style'
import { Heading, Link, Position, Text } from 'evergreen-ui'
import { func } from 'prop-types'
import { IconType } from 'react-icons/lib/iconBase'
import {
  compose,
  getContext,
  onlyUpdateForKeys,
  setDisplayName
} from 'recompose'

import { DataTableFilter } from '../'
import AddNew from './addNew'

interface TOutter {
  title: string
  services: IconType[]
}
interface TInner {
  filter: DataTableFilter
}

export default compose<TInner & TOutter, TOutter>(
  setDisplayName('pod-title'),
  onlyUpdateForKeys(['title', 'services']),
  getContext({ filter: func })
)(({ title, services = [] }) => (
  <Title>
    <div className="drag-h" />

    <div>
      <Heading size={800} is="h2">
        {title}

        <AddNew position={Position.BOTTOM_LEFT} variant="select">
          <Button
            href="javascript:;"
            icon="refresh"
            data-tip="Change refresh interval"
            display="inline-block"
            appearance="minimal"
            marginLeft={8}
            style={{ top: -2 }}
          />
        </AddNew>
      </Heading>

      <nav>
        {services.length && (
          <figure>
            {[].slice.call(services).map((I: IconType) => (
              <Link
                key={Math.random()}
                href="javascript:;"
                target="_blank"
                rel="noopener noreferrer">
                <I />
              </Link>
            ))}
          </figure>
        )}

        <AddNew position={Position.BOTTOM_RIGHT}>
          <Button href="javascript:;" icon="series-add" data-tip="Add Source" />
        </AddNew>
      </nav>
    </div>

    <div>
      <Text is="small" color="muted" size={300}>
        Updated&nbsp;
        <time>
          6 hours ago, next update in <strong>15 minutes</strong>
        </time>
      </Text>
    </div>
  </Title>
))
