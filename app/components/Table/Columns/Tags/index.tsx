import TagLabel from '@/components/TagLabel'
import withTags, { TagState } from '@/lib/withTags'
import { Tag } from '@/server/schema/types'
import { FaEmptySet } from 'react-icons/fa'
import { Box, Flex } from 'rebass'
import { compose, setDisplayName, withProps } from 'recompose'

import { ColumnProps } from '..'
import Menu from './Menu'
import Tags from './style'

export default compose<TagsProps, TagsProps>(
  setDisplayName('col-menu'),
  withTags(
    withProps<TagsProps, TagsProps>(({ item = {} }) => ({
      initialTags: 'tags' in item ? (item.tags as Tag[]) : []
    }))
  )
)(({ item, tags, ...props }) => (
  <Tags
    p={0}
    name="tags"
    tabIndex={1}
    onBlur={({ currentTarget: el, relatedTarget: target }) => {
      const $a = el.querySelector('.menu-true')

      if (!el.contains(target as HTMLElement) && $a instanceof HTMLElement) {
        $a.click()
      }
    }}>
    <Flex alignItems="center">
      <Box
        css={`
          position: relative;
        `}>
        <Menu item={item} {...props} />
      </Box>

      <Box
        css={`
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: ${tags.length ? 'flex-end' : 'center'};
          width: 100%;
          padding: var(--pad) 0;
        `}>
        {tags.length ? (
          tags.map((t, i) => <TagLabel key={i + t._id} {...t} />)
        ) : (
          <FaEmptySet style={{ opacity: 0.5 }} />
        )}
      </Box>
    </Flex>
  </Tags>
))

export type TagsProps = ColumnProps & TagState
