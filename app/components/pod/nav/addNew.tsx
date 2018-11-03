import { Card, Heading, Pane, SideSheet } from 'evergreen-ui'
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
)(({ children, isShown, toggle }) => (
  <>
    {cloneElement(children, {
      onClick: () => toggle(!isShown)
    })}

    <SideSheet
      isShown={isShown}
      onCloseComplete={() => toggle(false)}
      containerProps={{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        paddingTop: 70
      }}>
      <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
        <Card
          backgroundColor="white"
          elevation={0}
          height={240}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <Heading>Some content</Heading>
        </Card>
      </Pane>
    </SideSheet>
  </>
))
