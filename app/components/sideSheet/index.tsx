import {
  Card,
  Heading,
  Pane,
  Paragraph,
  SideSheet,
  Tab,
  TabNavigation
} from 'evergreen-ui'
import {
  compose,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from 'recompose'

export interface TOutter {
  children: (a: any) => JSX.Element
  render: (a: any) => JSX.Element
  tabs?: string[]

  title?: string | ((a: any) => JSX.Element)
  sub?: string
  [key: string]: any
}

interface TState {
  state: {
    isShown: boolean
    tab?: string
  }
}

interface TStateHandles extends StateHandlerMap<TState> {
  toggle: StateHandler<TState>
  setTab: StateHandler<TState>
}

export default compose<TStateHandles & TState & TOutter, TOutter>(
  setDisplayName('side-sheet'),
  withStateHandlers<TState, TStateHandles, TOutter>(
    ({ tabs = [''] }) => ({
      state: {
        isShown: false,
        tab: tabs[0]
      }
    }),
    {
      toggle: ({ state }) => (isShown: boolean) => ({
        state: { ...state, isShown }
      }),
      setTab: ({ state }) => (tab: string) => ({ state: { ...state, tab } })
    }
  )
)(
  ({
    children,
    render,
    state,
    toggle,
    setTab,
    tabs = [],
    title,
    sub,
    ...props
  }) => (
    <>
      {children({ ...state, toggle })}

      <SideSheet
        isShown={state.isShown}
        onCloseComplete={() => toggle(false)}
        {...props}>
        <Pane
          flex="1"
          overflowY="scroll"
          background="tint1"
          padding={0}
          height="100%">
          {tabs.length && (
            <Pane display="flex" padding={8} backgroundColor="white">
              <TabNavigation>
                {tabs.map(t => (
                  <Tab
                    key={t}
                    is="a"
                    href="javascript:;"
                    id={t}
                    isSelected={t === state.tab}
                    onSelect={() => setTab(t)}>
                    {t}
                  </Tab>
                ))}
              </TabNavigation>
            </Pane>
          )}

          {title && (
            <Pane
              zIndex={1}
              flexShrink={0}
              elevation={0}
              backgroundColor="white">
              <Pane padding={16}>
                <Heading size={600}>
                  {typeof title === 'string' ? title : title({ ...state })}
                </Heading>
                {sub && <Paragraph size={400}>{sub}</Paragraph>}
              </Pane>
            </Pane>
          )}

          <Pane background="tint1" padding={16}>
            <Card
              elevation={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              backgroundColor="white">
              {render({ ...state, toggle })}
            </Card>
          </Pane>
        </Pane>
      </SideSheet>
    </>
  )
)
