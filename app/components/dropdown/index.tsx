import { compose, onlyUpdateForKeys, withHandlers, withState } from 'recompose'

import Label, { TOutter as LabelProps } from './label'
import Dropdown from './style'

let tm

interface TOutter {
  label: string | JSX.Element
  onToggle?: (e?: HTMLAnchorElement) => void
  children: (e?: React.ComponentType<LabelProps>) => React.ReactNode
}

interface TState {
  isOpen: boolean
  toggle: (b: boolean, cb?: () => void) => void
}

interface THandles {
  handleMouse: (e: React.MouseEvent<any> | React.FocusEvent<any>) => void
}

export default compose<THandles & TState & TOutter, TOutter>(
  withState('isOpen', 'toggle', false),
  withHandlers<TState & TOutter, THandles>(() => ({
    handleMouse: ({ isOpen, toggle }) => ({ currentTarget, type }) => {
      clearTimeout(tm)
      const f = (b, d = 100) => (tm = setTimeout(() => toggle(b), d))

      if (!isOpen && type === 'mouseenter') {
        f(true)
      } else if (isOpen && type === 'mouseleave') {
        f(false, 400)
      } else if (type === 'click') {
        f(true, 0)
      } else if (type === 'blur') {
        window.requestAnimationFrame(() => {
          if (!currentTarget.contains(document.activeElement)) {
            f(false, 0)
          }
        })
      }
    }
  })),
  onlyUpdateForKeys(['isOpen'])
)(({ children, isOpen, label, handleMouse }) => (
  <Dropdown
    tabIndex={0}
    isOpen={isOpen}
    onMouseEnter={handleMouse}
    onMouseLeave={handleMouse}
    onBlur={handleMouse}>
    <a href="javascript:;" onClick={handleMouse}>
      {label}
    </a>

    {isOpen && <nav key={`nav-${label}`}>{children(Label)}</nav>}
  </Dropdown>
))
