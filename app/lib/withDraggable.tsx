import * as d3 from 'd3'
import { withHandlers } from 'recompose'

const tm: d3.Timer | any = {}

export default (style: React.CSSProperties = {}) =>
  withHandlers<void, DraggableProps>(() => ({
    dragHandle: () => ref => {
      if (!ref) {
        return
      }

      const el = ref.closest('[data-draggable]')

      if (el instanceof HTMLElement) {
        for (const [k, v] of Object.entries(style)) {
          el.style[k] = v
        }

        d3.select(el).call(
          d3
            .drag()
            .subject(() => el.getBoundingClientRect())
            .on('start', () => {
              el.style.cursor = 'move'
              el.style.zIndex = '9999'
              el.style.position = 'fixed'

              const { width: w, height: h } = el.getBoundingClientRect()

              d3.event.on('drag', () => {
                el.classList.add('dragging')

                el.style.top = `${Math.min(
                  window.innerHeight - h,
                  Math.max(0, d3.event.y)
                )}px`

                el.style.left = `${Math.min(
                  window.innerWidth - w,
                  Math.max(0, d3.event.x)
                )}px`
              })

              d3.event.on('end', () => el.classList.remove('dragging'))
            })
        )
      }
    }
  }))

export interface DraggableProps {
  dragHandle?: (ref: HTMLElement) => void
}
