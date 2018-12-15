import Dropdown from '@/components/Dropdown'
import { getTags, MODIFY_DOC, REMOVE_DOC } from '@/lib/queries'
import { TagHandlers, TagState } from '@/lib/withTags'
import { Tag } from '@/server/schema/types'
import { orderBy } from 'lodash'
import { graphql } from 'react-apollo'
import { IoMdCheckmark, IoMdTrash } from 'react-icons/io'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Box } from 'rebass'
import {
  compose,
  setDisplayName,
  shouldUpdate,
  withProps,
  withState
} from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'

export default compose<TagsMenuProps & TagState, TagsMenuProps>(
  setDisplayName('col-menu-dropdown'),
  graphql<TagsMenuProps & TagHandlers, {}, {}, TagsMenuProps>(REMOVE_DOC, {
    props: ({ mutate, ownProps: { item } }) => ({
      delItem: ({ target }) => {
        const $row = (target as HTMLElement).closest('tr')

        if ($row instanceof HTMLElement) {
          $row.firstElementChild.addEventListener(
            'animationend',
            () => {
              $row.remove()

              mutate({
                variables: {
                  objectId: item._id,
                  collectionName: 'products'
                }
              })
            },
            { once: true }
          )

          $row.classList.add('anim-out')
        }
      }
    })
  }),
  graphql<TagsMenuProps & TagHandlers, {}, {}, TagsMenuProps>(MODIFY_DOC, {
    props: ({ mutate, ownProps: { item, addTag, delTag, delItem } }) => ({
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

        window.requestAnimationFrame(() => {
          mutate({
            refetchQueries: ['getTags'],
            variables: {
              objectId: tag._id,
              collectionName: 'tags',
              input: JSON.parse(
                JSON.stringify({
                  $inc: {
                    total: isChecked ? 1 : -1
                  }
                })
              )
            }
          })

          mutate({
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
        })
      },

      handleDelete: e => {
        e.persist()
        delItem(e)

        for (let i = 0, l = item.tags.length; i < l; i++) {
          const tag = item.tags[i] as Tag

          window.requestAnimationFrame(() =>
            mutate({
              refetchQueries: i === l - 1 ? ['getTags'] : [],
              variables: {
                objectId: tag._id,
                collectionName: 'tags',
                input: JSON.parse(
                  JSON.stringify({
                    $inc: {
                      total: -1
                    }
                  })
                )
              }
            })
          )
        }
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
        onClick={() => toggle(!isOpen)}
      />
    )}
  </Dropdown>
))

const Menu = compose<TagsMenuProps, TagsMenuProps>(
  getTags(),
  withProps<TagsMenuProps, TagsMenuProps>(({ initialTags }) => ({
    tags: orderBy(initialTags, ['isQuery', 'createdAt'], ['desc', 'desc'])
  })),
  shouldUpdate<TagsMenuProps>((p, np) => p.isOpen !== np.isOpen)
)(({ item, tags, ...props }) => (
  <>
    <Box as="ul">
      {tags.map(t => (
        <MenuItem
          key={t._id}
          isChecked={(item.tags as Tag[]).some(tt => t._id === tt._id)}
          handleToggle={props.handleToggle}
          {...t}
        />
      ))}
    </Box>

    <Box as="ul">
      <li>
        <a href="javascript:;" onClick={props.handleDelete}>
          <IoMdTrash />
          <Text>Delete</Text>
        </a>
      </li>
    </Box>
  </>
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
      {isChecked ? <IoMdCheckmark /> : <MdCheckBoxOutlineBlank />}

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
  tags?: Tag[]
  handleToggle?: (b: boolean, t: Tag) => any
  delItem?: React.MouseEventHandler<HTMLElement>
  handleDelete?: React.MouseEventHandler<HTMLElement>
}
