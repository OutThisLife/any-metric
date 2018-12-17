import { withHandlers } from 'recompose'

export default (style: React.CSSProperties = {}) =>
  withHandlers<void, DraggableProps>(() => ({
    dragHandle: () => ref => {
      if (!ref) {
        return
      }

      const el = ref.closest('[data-draggable]')

      if (el instanceof HTMLElement) {
        el.style.cursor = 'move'
        el.style.userSelect = 'none'
        el.style.zIndex = '9999'
        el.style.position = 'fixed'

        for (const [k, v] of Object.entries(style)) {
          el.style[k] = v
        }

        const handleMouseMove = ({ pageX, pageY }) => {
          el.classList.add('dragging')

          let { x, y } = (window as any).mouse
          const { top, left, width: w, height: h } = el.getBoundingClientRect()

          x = pageX - (x - left)
          y = pageY - (y - top)

          el.style.right = 'auto'
          el.style.bottom = 'auto'
          el.style.top = `${Math.min(window.innerHeight - h, Math.max(0, y))}px`
          el.style.left = `${Math.min(window.innerWidth - w, Math.max(0, x))}px`
        }

        const handleMouseOut = () => {
          el.classList.remove('dragging')
          el.removeEventListener('mousemove', handleMouseMove)
        }

        el.addEventListener('mousedown', () => {
          el.addEventListener('mousemove', handleMouseMove)
          el.addEventListener('mouseup', handleMouseOut, { once: true })
          el.addEventListener('mouseleave', handleMouseOut, { once: true })
        })
      }
    }
  }))

export interface DraggableProps {
  dragHandle?: (ref: HTMLElement) => void
}
