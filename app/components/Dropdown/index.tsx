import Text from '@/components/Text'
import { Box } from 'rebass'
import { compose, defaultProps, setDisplayName, withState } from 'recompose'

import Dropdown from './style'

export default compose<DropdownState & DropdownProps, DropdownProps>(
  setDisplayName('dropdown'),
  defaultProps({
    direction: 'left'
  }),
  withState('isOpen', 'toggle', false)
)(({ children, isOpen, toggle, direction, ...props }) => (
  <Dropdown {...props}>
    {children({ isOpen, toggle })}

    {isOpen && (
      <Box
        as="div"
        className="dropdown"
        css={`
          ${direction === 'top' &&
            `
            left: 50%;
            bottom: 100%;
            padding-bottom: 1em;
            transform: translate(-50%, 0);
          `};

          ${direction === 'right' &&
            `
            top: 0;
            left: 100%;
            padding-left: 1em;
          `};

          ${direction === 'bottom' &&
            `
            top: 100%;
            left: 50%;
            padding-top: 1em;
            transform: translate(-50%, 0);
          `};

          ${direction === 'left' &&
            `
            top: 0;
            right: 100%;
            padding-right: 1em;
          `};
        `}>
        <Box as="div">
          {[...Array(2)].map(() => (
            <Box as="ul">
              <li>
                <Text as="h5" m={0}>
                  Group Name
                </Text>
              </li>

              <li>
                <a href="javascript:;">Item 1</a>
              </li>

              <li>
                <a href="javascript:;">Item 2</a>
              </li>

              <li>
                <a href="javascript:;">Item 3</a>
              </li>

              <li>
                <a href="javascript:;">Item 4</a>
              </li>

              <li>
                <a href="javascript:;">Item 5</a>
              </li>
            </Box>
          ))}
        </Box>
      </Box>
    )}
  </Dropdown>
))

interface DropdownState {
  isOpen?: boolean
  toggle?: (b: boolean) => void
}

export interface DropdownProps {
  direction: 'top' | 'right' | 'bottom' | 'left'
  children: (props: DropdownState) => JSX.Element
}
