import { createElement } from 'react'
import { createPortal } from 'react-dom'
import { BoxProps } from 'rebass'
import {
  compose,
  onlyUpdateForKeys,
  setDisplayName,
  shouldUpdate,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from 'recompose'

export default <T extends { [key: string]: any }>({
  onUpdate = () => null
}: {
  onUpdate?: (a?: T | PortalState, b?: T | PortalState) => boolean
} = {}) => (Component: React.ComponentType<any>) =>
  compose<PortalProps & PortalState, PortalProps & BoxProps>(
    setDisplayName('modal'),
    withStateHandlers<
      PortalState,
      StateHandlerMap<PortalState> & {
        toggle: StateHandler<PortalState>
      }
    >(({ isShown: isOpen = false }: PortalState) => ({ isOpen }), {
      toggle: () => isOpen => ({ isOpen })
    }),
    shouldUpdate<PortalProps & PortalState>((p, np) => {
      if (!('browser' in process && 'id' in p) || +p.isOpen & +np.isOpen) {
        return false
      }

      const el = document.getElementById(p.id)

      if (+p.isOpen ^ +np.isOpen && el instanceof HTMLElement) {
        el.classList.add('anim-out')

        el.lastElementChild.addEventListener(
          'animationend',
          () => p.toggle(false),
          {
            once: true
          }
        )

        return false
      } else {
        onUpdate(p, np)
      }

      return true
    }),
    onlyUpdateForKeys(['isOpen'])
  )(({ children, render, ...props }) => (
    <>
      {children(props)}

      {'browser' in process &&
        props.isOpen &&
        createPortal(
          <Component {...props}>{createElement(render, props)}</Component>,
          document.body
        )}
    </>
  ))

export interface PortalState {
  isOpen?: boolean
  toggle?: (b: boolean) => void
  [key: string]: any
}

export interface PortalProps {
  id: string
  isShown?: boolean
  children?: (a: PortalState) => React.ReactNode
  render?: React.SFC<PortalState>
}
