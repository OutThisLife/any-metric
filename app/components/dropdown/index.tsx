import { compose, withState } from 'recompose'

import Dropdown from './style'

interface TOutter {
  label: string | JSX.Element
}

interface TState {
  isOpen: boolean
  open: (b: boolean) => void
}

export default compose<TState & TOutter, TOutter>(
  withState('isOpen', 'open', false)
)(({ isOpen, open, label }) => (
  <Dropdown
    tabIndex={0}
    onBlur={({ currentTarget }) =>
      window.requestAnimationFrame(() => {
        if (!currentTarget.contains(document.activeElement)) {
          open(false)
        }
      })
    }>
    <a href="javascript:;" onClick={() => open(!isOpen)}>
      {label}
    </a>

    {isOpen && (
      <nav>
        <a href="javascript:;">Important</a>
        <a href="javascript:;">Lead</a>
        <a href="javascript:;">Broken</a>
        <a href="javascript:;">Djarum</a>
        <a href="javascript:;">LF2M MC</a>
      </nav>
    )}
  </Dropdown>
))
