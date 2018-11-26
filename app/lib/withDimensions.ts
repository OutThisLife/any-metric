import { findDOMNode } from 'react-dom'
import {
  compose,
  lifecycle,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from 'recompose'
import ResizeObserver from 'resize-observer-polyfill'

export default compose<DimProps, {}>(
  setDisplayName('with-dimensions'),
  withStateHandlers<TState, TStateHandles>(
    () => ({
      width: 1024,
      height: 768
    }),
    {
      setDimensions: () => ({ width, height }) => ({ width, height })
    }
  ),
  lifecycle<TState & TStateHandles, TState, any>({
    componentDidMount() {
      this.observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          this.props.setDimensions(entry.contentRect)
        }
      })

      try {
        const el = findDOMNode(this).parentElement
        this.observer.observe(el)

        window.requestAnimationFrame(() =>
          window.dispatchEvent(new CustomEvent('resize'))
        )
      } catch (e) {
        // noop
      }
    },

    componentWillUnmount() {
      this.observer.disconnect()
    }
  })
)

export interface TState {
  width: number
  height: number
}

export interface TStateHandles extends StateHandlerMap<TState> {
  setDimensions: StateHandler<TState>
}

export type DimProps = TState & TStateHandles
