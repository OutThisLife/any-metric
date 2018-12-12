import Dropdown from '@/components/Dropdown'
import { GET_PRODUCTS, getTags, MODIFY_DOC } from '@/lib/queries'
import withTags, { TagHandlers, TagState } from '@/lib/withTags'
import { Tag } from '@/server/schema/types'
import { graphql } from 'react-apollo'
import { MdLabelOutline } from 'react-icons/md'
import { compose, setDisplayName } from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
import Item from './Item'

export default compose<TagsMenuProps & TagState, TagsMenuProps>(
  setDisplayName('col-menu-dropdown'),
  getTags({}, 'initialTags'),
  graphql<TagsMenuProps & TagHandlers, {}, {}, TagsMenuProps>(MODIFY_DOC, {
    props: ({ mutate, ownProps: { item, addTag, delTag } }) => ({
      handleToggle: (isChecked, tag) => {
        if (isChecked) {
          addTag(tag)
        } else {
          const el = document.querySelector(
            `tr[id="${item._id}"] td [aria-label="${tag.slug}"]`
          )

          if (el instanceof HTMLElement) {
            el.addEventListener('animationend', () => delTag(tag), {
              once: true
            })

            el.classList.add('anim-out')
          } else {
            delTag(tag)
          }
        }

        window.requestAnimationFrame(() =>
          mutate({
            refetchQueries: [{ query: GET_PRODUCTS }],
            variables: {
              objectId: item._id,
              collectionName: 'products',
              input: JSON.parse(
                JSON.stringify({
                  [isChecked ? '$push' : '$pull']: {
                    tags: tag._id
                  }
                })
              )
            }
          })
        )
      }
    })
  })
)(({ item, initialTags: tags, handleToggle }) => (
  <Dropdown
    direction="bottom"
    menu={[
      {
        title: 'Tags',
        items: tags.map(t => (
          <Item
            key={t._id}
            isChecked={(item.tags as Tag[]).some(tt => t._id === tt._id)}
            onToggle={handleToggle}
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
))

export interface TagsMenuProps extends ColumnProps {
  initialTags?: Tag[]
  handleToggle?: (b: boolean, t: Tag) => any
}
