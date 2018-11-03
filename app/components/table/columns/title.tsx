import Dropdown from '@/components/dropdown'
import { DataTableFilter } from '@/components/pod'
import withTags, { THandles as SetTagHandles } from '@/lib/withTags'
import theme, { autoColour } from '@/theme'
import {
  Badge,
  Heading,
  Icon,
  IconButton,
  Link,
  Position,
  Text
} from 'evergreen-ui'
import { func } from 'prop-types'
import { MdLabelOutline } from 'react-icons/md'
import {
  compose,
  getContext,
  onlyUpdateForKeys,
  setDisplayName,
  withHandlers,
  withState
} from 'recompose'

import { Cell } from '.'
import { Title } from './style'

interface TOutter extends Cell<string> {}

interface TInner extends TOutter, SetTagHandles {
  tags: string[]
  curTags: string[]
  setCurTags: (t: string[]) => any
  filter?: DataTableFilter
}

interface THandles {
  handleClick: (t: { value: string }, s?: boolean) => void
}

export default (compose<TInner & THandles, TOutter>(
  setDisplayName('col-title'),
  getContext({ filter: func }),
  withTags(),
  withState('curTags', 'setCurTags', ({ rowData: { tags } }) => tags),
  withHandlers<TInner, THandles>(() => ({
    handleClick: ({ setCurTags, setTag, curTags: tags, rowData: { id } }) => ({
      value
    }) => setTag({ id, tags }, value, t => setCurTags(t))
  })),
  onlyUpdateForKeys(['curTags'])
) as any)(
  ({
    handleClick,
    tags,
    curTags,
    filter,
    rowData: { id, copy },
    cellData: title
  }) => (
    <Title>
      <Heading is="h4" size={400}>
        <Dropdown
          key={`tags-dd-${id}`}
          title="Tag this item"
          position={Position.BOTTOM_LEFT}
          options={tags.sort().map(t => ({ label: t, value: t }))}
          selected={curTags}
          onSelect={handleClick}
          onDeselect={handleClick}>
          <IconButton
            appearance="minimal"
            icon={<MdLabelOutline fill={theme.colours.base} />}
            display="inline-block"
            height={12}
            marginRight={5}
          />
        </Dropdown>

        <Link
          href="javascript:;"
          color="neutral"
          target="_blank"
          rel="noopener"
          className="title"
          size={400}
          style={{ fontWeight: 700 }}>
          {title}
        </Link>
      </Heading>

      <div>
        <Text is="span" color="muted" size={300} className="copy">
          {copy}
        </Text>

        <span className="tags">
          {curTags.filter(t => t).map(t => (
            <Badge key={`label-${t}`} data-tag={t} style={autoColour(t)}>
              <span
                onClick={() =>
                  filter({
                    value: t,
                    action: 'TAG'
                  })
                }>
                {t}
              </span>
              <a href="javascript:;" onClick={() => handleClick({ value: t })}>
                <Icon icon="trash" color={autoColour(t).color} size={8} />
              </a>
            </Badge>
          ))}
          &nbsp;
        </span>
      </div>
    </Title>
  )
)
