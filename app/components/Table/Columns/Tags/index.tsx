import Dropdown from '@/components/Dropdown'
import Tag from '@/components/Tag'
import { getTags } from '@/lib/queries'
import { CategoryItem } from '@/lib/utils'
import { MockResult } from '@/server/schema/types'
import { FaEmptySet } from 'react-icons/fa'
import { MdLabelOutline } from 'react-icons/md'
import { Box, Flex } from 'rebass'
import {
  compose,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  withHandlers,
  withStateHandlers
} from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
import Item from './Item'
import Tags from './style'

export default compose<TagState & TagProps & TagHandlers, TagProps>(
  setDisplayName('col-menu'),
  getTags(),
  withStateHandlers<TagState, TagHandlers, TagProps>(
    ({ item: { tags = [] } = {} }) => ({ tags }),
    {
      addTag: ({ tags }) => (tag: string) => {
        if (!tags.find(t => t === tag)) {
          tags.push(tag)
        }

        return { tags }
      },

      delTag: ({ tags }) => (tag: string) => {
        tags.splice(tags.findIndex(t => t === tag), 1)
        return { tags }
      }
    }
  ),
  withHandlers(() => ({
    openMenu: () => e => {
      e.preventDefault()
      const $a = e.currentTarget.querySelector('.menu-false')

      if ($a instanceof HTMLElement) {
        $a.click()
      }
    },

    closeMenu: () => e => {
      const $a = e.currentTarget.querySelector('.menu-true')

      if ($a instanceof HTMLElement) {
        $a.click()
      }
    }
  }))
)(
  ({
    children,
    item = {},
    initialTags = [],
    tags,
    openMenu,
    closeMenu,
    addTag,
    delTag
  }) => (
    <Tags name="tags" p={0} disableSort>
      {!('id' in item) ? (
        children
      ) : (
        <Flex
          alignItems="center"
          css={`
            display: grid;
            grid-template-columns: 25px 170px;
          `}
          onContextMenu={openMenu}>
          <Box
            css={`
              position: relative;
            `}>
            <Dropdown
              direction="bottom"
              menu={[
                {
                  title: 'Tags',
                  items: initialTags.map(({ title: t }) => (
                    <Item
                      title={t}
                      isChecked={tags.includes(t)}
                      onToggle={(e, b) => {
                        if (b) {
                          return addTag(t)
                        }

                        const $td = (e.target as HTMLElement).closest('td')

                        if ($td instanceof HTMLElement) {
                          const $tag = $td.querySelector(`[aria-label="${t}"]`)

                          if ($tag) {
                            $tag.classList.add('anim-out')
                            $tag.addEventListener('animationend', () =>
                              delTag(t)
                            )
                          } else {
                            delTag(t)
                          }
                        }
                      }}
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
                  onMouseEnter={() => toggle(!isOpen)}
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
              tags.map(t => <Tag key={t} title={t} />)
            ) : (
              <FaEmptySet style={{ opacity: 0.5 }} />
            )}
          </Box>
        </Flex>
      )}
    </Tags>
  )
)

interface TagState {
  tags: MockResult['tags']
}

interface TagProps extends ColumnProps {
  item?: MockResult
  initialTags?: CategoryItem[]
}

interface TagHandlers extends StateHandlerMap<TagState> {
  addTag?: StateHandler<TagState>
  delTag?: StateHandler<TagState>
}
