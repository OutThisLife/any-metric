import withPortal, { PortalProps, PortalState } from '@/lib/withPortal'
import { Box } from 'rebass'
import { compose, defaultProps, setDisplayName, withHandlers } from 'recompose'

import Popover from './style'

export default compose<PopoverProps & PortalState, PopoverProps & PortalProps>(
  setDisplayName('popover'),
  defaultProps({
    direction: 'bottom'
  }),
  withHandlers<PopoverProps, Partial<PopoverProps>>(() => ({
    handleMouse: ({ direction, id }) => ({
      target,
      clientX: x,
      clientY: y
    }) => {
      const o = 25
      const el = document.getElementById(id)

      if (!(el instanceof HTMLElement && target instanceof HTMLElement)) {
        return
      }

      switch (direction) {
        case 'top':
          y -= el.clientHeight + o * 2
          x -= el.clientWidth / 2 + o
          break

        case 'right':
          y -= el.clientHeight / 2 + o
          break

        case 'bottom':
          x -= el.clientWidth / 2 + o
          break

        case 'left':
          y -= el.clientHeight / 2 + o
          x -= el.clientWidth + o * 2
          break
      }

      if (y >= window.innerHeight - el.clientHeight + o) {
        y -= el.clientHeight + o * 2
      }

      el.style.top = `${Math.max(o / 2, y + o)}px`
      el.style.left = `${Math.max(o / 2, x + o)}px`
    }
  })),
  withPortal<PopoverProps & PortalState>({
    onUpdate: ({ handleMouse }, { isOpen }) => {
      if (isOpen) {
        document.addEventListener('mousemove', handleMouse as any)
      } else {
        document.removeEventListener('mousemove', handleMouse as any)
      }

      return true
    }
  })
)(({ id, children, direction }) => (
  <Popover as="div" id={id}>
    <Box
      css={`
        ${direction === 'top' && 'transform-origin: center bottom'};
        ${direction === 'right' && 'transform-origin: left center'};
        ${direction === 'bottom' && 'transform-origin: center top'};
        ${direction === 'left' && 'transform-origin: right center'};
      `}>
      {children}
    </Box>
  </Popover>
))

export interface PopoverProps {
  id: string
  direction: 'top' | 'right' | 'bottom' | 'left'
  handleMouse?: React.MouseEventHandler<HTMLElement>
}
