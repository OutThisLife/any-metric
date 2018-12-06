import { IoMdCheckmark } from 'react-icons/io'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Box } from 'rebass'
import { compose, setDisplayName, withState } from 'recompose'

import { Text } from '../../style'

export default compose<MenuItemState & MenuItemProps, MenuItemProps>(
  setDisplayName('col-menu-item'),
  withState('isChecked', 'toggle', ({ isChecked = false }) => isChecked)
)(({ title, isChecked, toggle }) => (
  <Box
    as="a"
    href="javascript:;"
    onClick={() => toggle(!isChecked)}
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

    <Text>{title}</Text>
  </Box>
))

interface MenuItemState {
  toggle?: (b: boolean) => void
}

export interface MenuItemProps {
  isChecked?: boolean
  title: string
}
