import Text from '@/components/Text'
import { Box } from 'rebass'
import {
  compose,
  defaultProps,
  setDisplayName,
  withHandlers,
  withState
} from 'recompose'

import Dropdown from './style'

export default compose<DropdownState & DropdownProps, DropdownProps>(
  setDisplayName('dropdown'),
  defaultProps({
    direction: 'left',
    menu: [],
    onClick: () => null
  }),
  withState('isOpen', 'toggle', false),
  withHandlers<DropdownProps, DropdownState>(() => ({
    onRef: () => ref => {
      if (!ref) {
        return
      }

      const el = ref.closest('.dropdown')

      if (el instanceof HTMLElement) {
        const { top, left } = el.getBoundingClientRect()

        el.style.position = 'fixed'
        el.style.top = `${top}px`
        el.style.right = 'auto'
        el.style.bottom = 'auto'
        el.style.left = `${left}px`
      }
    }
  }))
)(({ onRef, children, isOpen, toggle, menu, onClick, ...props }) => (
  <>
    {children({ isOpen, toggle })}

    {isOpen && (
      <Dropdown ref={onRef} as="div" className="dropdown" {...props}>
        <Box as="div">
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
  children: (props: DropdownState) => JSX.Element
  direction: 'top' | 'right' | 'bottom' | 'left'
  onClick?: (a?: {}) => void
  menu: Array<{
    title: string
    items: JSX.Element[]
  }>
}
