import * as d3 from 'd3'
import { findDOMNode } from 'react-dom'
import {
  compose,
  lifecycle,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from 'recompose'

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
      let el

      this.handleResize = () => {
        document.body.style.pointerEvents = 'none'

        d3.timeout(() => {
          this.props.setDimensions({
            width: el.clientWidth * 0.95,
            height: el.clientHeight
          })

          document.body.style.pointerEvents = 'auto'
        }, 150)
      }

      try {
        el = findDOMNode(this).parentElement

        window.dispatchEvent(new CustomEvent('resize'))

        this.handleResize()
        window.addEventListener('resize', this.handleResize)
      } catch (e) {
        // noop
      }
    },

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
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
