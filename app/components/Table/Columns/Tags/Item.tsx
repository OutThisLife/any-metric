import { Tag } from '@/server/schema/types'
import { IoMdCheckmark } from 'react-icons/io'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Box } from 'rebass'
import { compose, setDisplayName, withState } from 'recompose'

import { Text } from '../../style'
import { TagsMenuProps } from './Menu'

export default compose<MenuItemState & MenuItemProps, MenuItemProps>(
  setDisplayName('col-menu-item'),
  withState('isChecked', 'toggle', ({ isChecked = false }) => isChecked)
)(({ isChecked, toggle, onToggle, ...props }) => (
  <Box
    as="a"
    href="javascript:;"
    onClick={() => toggle(!isChecked, () => onToggle(!isChecked, props))}
    css={`
      svg {
        transform: translate(0, -1px);
      }
    `}>
    {isChecked ? (
      <IoMdCheckmark size={12} />
    ) : (
      <MdCheckBoxOutlineBlank size={12} />
    )}

    <Text>{props.title}</Text>
  </Box>
))

interface MenuItemState {
  toggle?: (b: boolean, cb?: any) => void
}

export interface MenuItemProps extends Tag {
  onToggle?: TagsMenuProps['handleToggle']
  isChecked?: boolean
}
