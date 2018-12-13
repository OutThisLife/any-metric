import { Direction, positionToMouse } from '@/lib/withPortal'
import { Box } from 'rebass'
import {
  compose,
  defaultProps,
  setDisplayName,
  shouldUpdate,
  withHandlers,
  withState
} from 'recompose'

import Dropdown from './style'

export default compose<DropdownState & DropdownProps, DropdownProps>(
  setDisplayName('dropdown'),
  defaultProps({
    isShown: false,
    direction: 'left',
    menu: [],
    onClick: () => null
  }),
  withState('isOpen', 'toggle', ({ isShown }) => isShown),
  shouldUpdate<DropdownProps & DropdownState>((p, np) => {
    if (!('browser' in process || p.isOpen === np.isOpen)) {
      return false
    }

    const el = document.querySelector('.dropdown')

    if (+p.isOpen ^ +np.isOpen && el instanceof HTMLElement) {
      el.classList.add('anim-out')
      el.addEventListener('animationend', () => np.toggle(false), {
        once: true
      })

      return false
    }

    return true
  }),
  withHandlers<DropdownState & DropdownProps, DropdownState>(({ toggle }) => {
    const closeHandle = ({ keyCode }) => keyCode === 27 && toggle(false)

    return {
      onRef: ({ direction }) => ref => {
        if (!ref) {
          document.removeEventListener('keydown', closeHandle)
          return
        }

        document.addEventListener('keydown', closeHandle)
        positionToMouse(ref.closest('.dropdown') as HTMLElement, ref, direction)
      }
    }
  })
)(({ onRef, children, isOpen, toggle, menu, onClick, ...props }) => (
  <>
    {children({ isOpen, toggle })}

    {isOpen && (
      <Dropdown ref={onRef} as="div" className="dropdown" {...props}>
        <Box>{menu({ isOpen })}</Box>
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
  direction: Direction
  children: (props: DropdownState) => JSX.Element
  menu: (props: DropdownState) => JSX.Element
  onClick?: (a?: {}) => void
}
