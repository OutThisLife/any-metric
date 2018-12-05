import Dropdown from '@/components/Dropdown'
import { getTags } from '@/lib/queries'
import { CategoryItem } from '@/lib/utils'
import { BaphoTheme } from '@/theme'
import { IoMdCheckbox, IoMdMenu } from 'react-icons/io'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers } from 'recompose'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
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
)(({ children, onBlur, item = {}, tags = [] }) => (
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
              <a href="javascript:;">
                {item.tags[0] === title && item.tags.includes(t.title) ? (
                  <IoMdCheckbox size={12} />
                ) : (
                  <MdCheckBoxOutlineBlank
                    size={12}
                    style={{
                      transform: 'translate(0, -0.1em)'
                    }}
                  />
                )}

                <Text>{t.title}</Text>
              </a>
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
  tags?: CategoryItem[]
  onBlur?: React.MouseEventHandler<HTMLElement>
}

export interface MenuProps extends ColumnProps {
  menu?: any[]
}
