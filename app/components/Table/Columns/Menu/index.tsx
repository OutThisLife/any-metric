import { IoMdMenu } from 'react-icons/io'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { Text } from '../../style'
import Column, { ColumnProps } from '../Column'

export default compose<MenuProps, MenuProps>(setDisplayName('col-menu'))(
  ({ children, item = {} }) => (
    <Column width={35} p={0} disableSort>
      {!('id' in item) ? (
        children
      ) : (
        <Box as="span">
          <Text
            css={`
              color: ${({ theme }) => theme.colours.muted};

              tr:not(:hover) & {
                opacity: 0.5;
              }
            `}>
            <IoMdMenu size={35} />
          </Text>
        </Box>
      )}
    </Column>
  )
)

interface MenuProps extends ColumnProps {
  menu?: any[]
}
