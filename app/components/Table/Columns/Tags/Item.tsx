import { IoMdCheckmark } from 'react-icons/io'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Box } from 'rebass'
import { compose, setDisplayName, withState } from 'recompose'

import { Text } from '../../style'

export default compose<MenuItemState & MenuItemProps, MenuItemProps>(
  setDisplayName('col-menu-item'),
  withState('isChecked', 'toggle', ({ isChecked = false }) => isChecked)
)(({ title, isChecked, toggle, onToggle }) => (
  <Box
    as="a"
    href="javascript:;"
    onClick={e => {
      e.persist()
      toggle(!isChecked, () => onToggle(e, !isChecked))
    }}
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
  toggle?: (b: boolean, cb?: any) => void
}

export interface MenuItemProps {
  onToggle?: (e: React.SyntheticEvent, b: boolean) => void
  isChecked?: boolean
  title: string
}
