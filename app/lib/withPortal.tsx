import * as d3 from 'd3'
import { createElement } from 'react'
import { createPortal } from 'react-dom'
import { BoxProps } from 'rebass'
import {
  compose,
  defaultProps,
  setDisplayName,
  shouldUpdate,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from 'recompose'

let tm: Partial<d3.Timer> = {}

export default () => (Component: React.ComponentType<any>) =>
  compose<PortalProps & PortalState, PortalProps & BoxProps>(
    setDisplayName('modal'),
    defaultProps({
      isShown: false
    }),
    withStateHandlers<
      PortalState,
      StateHandlerMap<PortalState> & {
        toggle: StateHandler<PortalState>
      }
    >(({ isShown }: PortalState) => ({ isOpen: isShown }), {
      toggle: () => isOpen => ({ isOpen })
    }),
    shouldUpdate<PortalProps & PortalState>((p, np) => {
      if (!(('browser' in process && 'id' in p) || p.isOpen === np.isOpen)) {
        return false
      }

      const el = document.getElementById(p.id)

      if (+p.isOpen ^ +np.isOpen && el instanceof HTMLElement) {
        el.classList.add('anim-out')

        el.lastElementChild.addEventListener(
          'animationend',
          () => np.toggle(false),
          {
            once: true
          }
        )

        return false
      }

      return true
    })
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

export const positionToMouse = (
  $parent: HTMLElement,
  el = $parent,
  direction: Direction
) => {
  if ('stop' in tm) {
    tm.stop()
  }

  if (!($parent instanceof HTMLElement && el instanceof HTMLElement)) {
    return
  }

  const draw = () => {
    let { x, y } = (window as any).mouse
    const { clientWidth: w, clientHeight: h } = el
    const o = 5

    switch (direction) {
      case 'top':
        y -= o
        break

      case 'right':
        x += o * 2
        y -= h / 2 + o
        break

      case 'bottom':
        y += o
        break

      case 'left':
        x -= o * 2
        y -= h / 2 + o
        break
    }

    $parent.style.zIndex = '9999'
    $parent.style.position = 'fixed'

    $parent.style.right = 'auto'
    $parent.style.bottom = 'auto'

    $parent.style.top = `${Math.min(window.innerHeight - h, Math.max(o, y))}px`

    $parent.style.left = `${Math.min(window.innerWidth - w, Math.max(o, x))}px`
  }

  if (
    window.getComputedStyle($parent).getPropertyValue('position') === 'fixed'
  ) {
    tm = d3.timer(() => {
      if (
        !($parent instanceof HTMLElement) ||
        $parent.classList.contains('anim-out')
      ) {
        return tm.stop()
      }

      draw()
    })
  } else {
    draw()
  }
}

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

export type Direction = 'top' | 'right' | 'bottom' | 'left'
