import Dropdown from '@/components/Dropdown'
import { getTags } from '@/lib/queries'
import { CategoryItem } from '@/lib/utils'
import { BaphoTheme } from '@/theme'
import { IoMdMenu } from 'react-icons/io'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers } from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
import Item from './Item'
import Menu from './style'

export default compose<MenuState & MenuProps & BaphoTheme, MenuProps>(
  setDisplayName('col-menu'),
  getTags(),
  withHandlers<MenuProps, MenuState>(() => ({
    onBlur: () => e => {
      const $a = e.currentTarget.querySelector('.menu-true')

      if ($a instanceof HTMLElement) {
        $a.click()
      }
    }
  }))
)(({ children, onBlur, item = {}, initialTags: tags = [] }) => (
  <Menu tabIndex={0} width={35} disableSort onMouseLeave={onBlur}>
    {!('id' in item) ? (
      children
    ) : (
      <Box
        as="span"
        css={`
          position: relative;
        `}>
        <Dropdown
          direction="left"
          menu={tags.map(({ title, items }) => ({
            title,
            items: items.map(t => (
              <Item
                title={t.title}
                isChecked={
                  item.tags[0] === title && item.tags.includes(t.title)
                }
              />
            ))
          }))}>
          {({ isOpen, toggle }) => (
            <Text
              as="a"
              href="javascript:;"
              className={`menu-${isOpen}`}
              onMouseEnter={() => toggle(!isOpen)}
              onClick={() => toggle(!isOpen)}>
              <IoMdMenu size={35} />
            </Text>
          )}
        </Dropdown>
      </Box>
    )}
  </Menu>
))

interface MenuState {
  initialTags?: CategoryItem[]
  onBlur?: React.MouseEventHandler<HTMLElement>
}

export interface MenuProps extends ColumnProps {
  menu?: any[]
}
