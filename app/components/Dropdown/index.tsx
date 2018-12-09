import Text from '@/components/Text'
import { Box } from 'rebass'
import { compose, defaultProps, setDisplayName, withState } from 'recompose'

import Dropdown from './style'

export default compose<DropdownState & DropdownProps, DropdownProps>(
  setDisplayName('dropdown'),
  defaultProps({
    isShown: false,
    direction: 'left',
    menu: [],
    onClick: () => null
  }),
  withState('isOpen', 'toggle', ({ isShown }) => isShown)
)(({ onRef, children, isOpen, toggle, menu, onClick, ...props }) => (
  <>
    {children({ isOpen, toggle })}

    {isOpen && (
      <Dropdown ref={onRef} as="div" className="dropdown" {...props}>
        <Box>
          {menu.map(({ title, items = [] }) => (
            <Box as="ul" key={title}>
              <li>
                <Text as="h5" m={0}>
                  {[title]}
                </Text>
              </li>

              {items.map((item, i) => (
                <li key={`${title}-${i}`}>{item}</li>
              ))}
            </Box>
          ))}
        </Box>
      </Dropdown>
    )}
  </>
))

interface DropdownState {
  isOpen?: boolean
  toggle?: (b: boolean) => void
  onRef?: (ref?: HTMLElement) => void
}

export interface DropdownProps {
  isShown?: boolean
  children: (props: DropdownState) => JSX.Element
  direction: 'top' | 'right' | 'bottom' | 'left'
  onClick?: (a?: {}) => void
  menu: Array<{
    title: string
    items: JSX.Element[]
  }>
}
