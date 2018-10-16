import { compose, withState } from 'recompose'

import Label, { TOutter as LabelProps } from './label'
import Dropdown from './style'

interface TOutter {
  label: string | JSX.Element
  onToggle?: (e?: HTMLAnchorElement) => void
  children: (e?: React.ComponentType<LabelProps>) => React.ReactNode
}

interface TState {
  isOpen: boolean
  toggle: (b: boolean, cb?: () => void) => void
}

export default compose<TState & TOutter, TOutter>(
  withState('isOpen', 'toggle', false)
)(({ children, isOpen, toggle, label, onToggle = () => null }) => (
  <Dropdown
    tabIndex={0}
    onBlur={({ currentTarget }) =>
      window.requestAnimationFrame(() => {
        if (!currentTarget.contains(document.activeElement)) {
          toggle(false)
        }
      })
    }>
    <a
      href="javascript:;"
      onClick={e => toggle(!isOpen, onToggle.bind(null, e.currentTarget))}>
      {label}
    </a>

    {isOpen && <nav>{children(Label)}</nav>}
  </Dropdown>
))
