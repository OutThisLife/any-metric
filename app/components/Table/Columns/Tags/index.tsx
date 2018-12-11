import Dropdown from '@/components/Dropdown'
import TagLabel from '@/components/TagLabel'
import { getTags, MODIFY_DOC, TagHandlers, TagState } from '@/lib/queries'
import { Product, Tag } from '@/server/schema/types'
import { FaEmptySet } from 'react-icons/fa'
import { MdLabelOutline } from 'react-icons/md'
import { Box, Flex } from 'rebass'
import {
  compose,
  setDisplayName,
  shallowEqual,
  shouldUpdate,
  withHandlers
} from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
import Item from './Item'
import Tags from './style'

export default compose<TagsProps & TagsHandlers, TagsProps>(
  setDisplayName('col-menu'),
  getTags(),
  withHandlers<TagHandlers, TagsHandlers>(() => ({
    handleToggle: ({ addTag, delTag }) => (e, tag, isChecked) => {
      if (isChecked) {
        return addTag(tag)
      }

      const $td = (e.target as HTMLElement).closest('td')

      if (!($td instanceof HTMLElement)) {
        return delTag(tag)
      }

      ;[].slice
        .call($td.querySelectorAll(`[aria-label="${tag.slug}"]`))
        .forEach(el => {
          el.addEventListener('animationend', () => delTag(tag), { once: true })
          el.classList.add('anim-out')
        })
    },

    handleBlur: () => ({ currentTarget: el, relatedTarget: target }) => {
      const $a = el.querySelector('.menu-true')

      if (!el.contains(target as HTMLElement) && $a instanceof HTMLElement) {
        $a.click()
      }
    }
  })),
  shouldUpdate<TagState>(({ item = {}, client, tags }, { tags: nextTags }) => {
    const b = shallowEqual(tags, nextTags)

    if (!(b && ('browser' in process && '_id' in item))) {
      return b
    }

    window.requestAnimationFrame(
      async () =>
        await client.mutate({
          mutation: MODIFY_DOC,
          variables: {
            objectId: item._id,
            collectionName: 'products',
            input: {
              tags: nextTags.map(t => t._id)
            }
          }
        })
    )

    return b
  })
)(({ children, item = {}, initialTags, tags, handleToggle, handleBlur }) => (
  <Tags name="tags" p={0} disableSort tabIndex={1} onBlur={handleBlur}>
    {!('_id' in item) ? (
      children
    ) : (
      <Flex
        alignItems="center"
        css={`
          display: grid;
          grid-template-columns: 25px 170px;
        `}>
        <Box
          css={`
            position: relative;
          `}>
          <Dropdown
            direction="bottom"
            menu={[
              {
                title: 'Tags',
                items: initialTags.map(t => (
                  <Item
                    key={t._id}
                    isChecked={tags.some(({ _id }) => t._id === _id)}
                    onToggle={(e, isChecked) => handleToggle(e, t, isChecked)}
                    {...t}
                  />
                ))
              }
            ]}>
            {({ isOpen, toggle }) => (
              <Text
                as="a"
                href="javascript:;"
                tabIndex={-1}
                className={`menu-${isOpen}`}
                onClick={() => toggle(!isOpen)}>
                <MdLabelOutline size={12} />
              </Text>
            )}
          </Dropdown>
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
            (tags as Tag[]).map(t => <TagLabel key={t._id} {...t} />)
          ) : (
            <FaEmptySet style={{ opacity: 0.5 }} />
          )}
        </Box>
      </Flex>
    )}
  </Tags>
))

interface TagsHandlers {
  handleBlur?: React.FocusEventHandler<HTMLElement>
  handleToggle?: (e: React.SyntheticEvent, t: Tag, b: boolean) => void
}

interface TagsProps extends ColumnProps, TagState {
  item?: Product
}
