import { Component, createFactory } from 'react'
import setDisplayName from 'recompose/setDisplayName'
import mapValues from 'recompose/utils/mapValues'
import wrapDisplayName from 'recompose/wrapDisplayName'

const withStateHandlers = (initialState, stateUpdaters) => BaseComponent => {
  const factory = createFactory(BaseComponent)

  class WithStateHandlers extends Component {
    public state =
      typeof initialState === 'function'
        ? initialState(this.props)
        : initialState

    public stateUpdaters = mapValues(
      stateUpdaters,
      handler => (mayBeEvent, ...args) => {
        // Having that functional form of setState can be called async
        // we need to persist SyntheticEvent
        if (mayBeEvent && typeof mayBeEvent.persist === 'function') {
          mayBeEvent.persist()
        }

        this.setState((state, props) =>
          handler(state, props)(mayBeEvent, ...args)
        )
      }
    )

    public render() {
      return factory({
        ...this.props,
        ...this.state,
        ...this.stateUpdaters
      })
    }
  }

  if (typeof initialState === 'function') {
    WithStateHandlers.getDerivedStateFromProps = initialState
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withStateHandlers'))(
      WithStateHandlers
    )
  }

  return WithStateHandlers
}

export default withStateHandlers
