import Dropdown from '@/components/Dropdown'
import { IoMdMenu } from 'react-icons/io'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { Text } from '../../style'
import Column, { ColumnProps } from '../Column'

export default compose<MenuProps, MenuProps>(setDisplayName('col-menu'))(
  ({ children, item = {} }) => (
    <Column width={35} disableSort>
      {!('id' in item) ? (
        children
      ) : (
        <Box as="span">
          <Text
            css={`
              color: ${({ theme }) => theme.colours.muted};

              tr:not(:hover) & svg[size='35'] {
                opacity: 0.5;
              }
            `}>
            <Dropdown direction="left">
              {({ isOpen, toggle }) => (
                <a
                  tabIndex={0}
                  href="javascript:;"
                  onClick={() => toggle(!isOpen)}
                  onBlur={() => toggle(false)}>
                  <IoMdMenu size={35} />
                </a>
              )}
            </Dropdown>
          </Text>
        </Box>
      )}
    </Column>
  )
)

interface MenuProps extends ColumnProps {
  menu?: any[]
}
