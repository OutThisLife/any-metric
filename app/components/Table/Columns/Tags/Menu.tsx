import Dropdown from '@/components/Dropdown'
import { getTags, MODIFY_DOC } from '@/lib/queries'
import { TagHandlers, TagState } from '@/lib/withTags'
import { Tag } from '@/server/schema/types'
import { graphql } from 'react-apollo'
import { IoMdCheckmark } from 'react-icons/io'
import { MdCheckBoxOutlineBlank, MdLabelOutline } from 'react-icons/md'
import { Box } from 'rebass'
import { compose, setDisplayName, shouldUpdate, withState } from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'

export default compose<TagsMenuProps & TagState, TagsMenuProps>(
  setDisplayName('col-menu-dropdown'),
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
            refetchQueries: ['getTags'],
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
)(props => (
  <Dropdown
    direction="bottom"
    menu={({ isOpen }) => <Menu isOpen={isOpen} {...props} />}>
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

const Menu = compose<TagsMenuProps, TagsMenuProps>(
  getTags(),
  shouldUpdate<TagsMenuProps>((p, np) => p.isOpen !== np.isOpen)
)(({ item, initialTags: tags, ...props }) => (
  <Box as="ul">
    <li>
      <Text as="h5" m={0}>
        Tags
      </Text>
    </li>

    {tags.map(t => (
      <MenuItem
        key={t._id}
        isChecked={(item.tags as Tag[]).some(tt => t._id === tt._id)}
        handleToggle={props.handleToggle}
        {...t}
      />
    ))}
  </Box>
))

const MenuItem = compose<MenuItemState & MenuItemProps, MenuItemProps>(
  setDisplayName('col-menu-item'),
  withState('isChecked', 'toggle', ({ isChecked = false }) => isChecked)
)(({ isChecked, toggle, handleToggle, ...props }) => (
  <Box
    as="li"
    css={`
      svg {
        transform: translate(0, -1px);
      }
    `}>
    <a
      href="javascript:;"
      onClick={() => toggle(!isChecked, () => handleToggle(!isChecked, props))}>
      {isChecked ? (
        <IoMdCheckmark size={12} />
      ) : (
        <MdCheckBoxOutlineBlank size={12} />
      )}

      <Text>{props.title}</Text>
    </a>
  </Box>
))

interface MenuItemState {
  toggle?: (b: boolean, cb?: any) => void
}

export interface MenuItemProps extends Tag {
  handleToggle?: TagsMenuProps['handleToggle']
  isChecked?: boolean
}

export interface TagsMenuProps extends ColumnProps {
  isOpen?: boolean
  initialTags?: Tag[]
  handleToggle?: (b: boolean, t: Tag) => any
}
