import { Dialog, Pane, Paragraph } from 'evergreen-ui'
import { cloneElement } from 'react'
import { compose, setDisplayName, withState } from 'recompose'

interface TOutter {
  children: React.ReactElement<any>
  [key: string]: any
}

interface TState {
  isShown: boolean
  toggle: (b: boolean) => void
}

export default compose<TState & TOutter, TOutter>(
  setDisplayName('add-new'),
  withState('isShown', 'toggle', false)
)(({ children, isShown, toggle, ...props }) => (
  <>
    {cloneElement(children, {
      onClick: () => toggle(!isShown)
    })}

    <Dialog
      title="Add New __"
      isShown={isShown}
      onCloseComplete={() => toggle(false)}
      topOffset="33vmin"
      {...props}>
      <Pane>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis
          alias reprehenderit aut placeat fugit illum sapiente minima, rem at
          distinctio nam, dolorum fuga esse maxime doloremque ipsam iusto a
          dolore.
        </Paragraph>
      </Pane>
    </Dialog>
  </>
))
