import { SideSheet } from 'evergreen-ui'
import { compose, setDisplayName, withState } from 'recompose'

export interface TOutter {
  children: (a: TState) => JSX.Element
  render: (a: TState) => JSX.Element
  [key: string]: any
}

interface TState {
  isShown: boolean
  toggle: (b: boolean) => void
}

export default compose<TState & TOutter, TOutter>(
  setDisplayName('side-sheet'),
  withState('isShown', 'toggle', false)
)(({ children, isShown, toggle, render, ...props }) => (
  <>
    {children({ isShown, toggle })}

    <SideSheet
      isShown={isShown}
      onCloseComplete={() => toggle(false)}
      {...props}>
      {render({ isShown, toggle })}
    </SideSheet>
  </>
))
