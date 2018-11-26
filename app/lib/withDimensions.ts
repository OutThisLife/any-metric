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
  withStateHandlers<DimState, DimStateHandlers>(
    () => ({
      width: 1024,
      height: 768
    }),
    {
      setDimensions: () => ({ width, height }) => ({ width, height })
    }
  ),
  lifecycle<DimState & DimStateHandlers, DimState, any>({
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
  }),
  setDisplayName('with-dimensions')
)

export interface DimState {
  width: number
  height: number
}

export interface DimStateHandlers extends StateHandlerMap<DimState> {
  setDimensions: StateHandler<DimState>
}

export type DimProps = DimState & DimStateHandlers
