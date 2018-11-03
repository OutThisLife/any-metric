import { Loading } from '@/lib/queries'
import theme from '@/theme'
import { compose, setDisplayName, withHandlers } from 'recompose'

interface TInner {
  onRef: (r: HTMLElement) => void
}

export default compose<TInner, {}>(
  setDisplayName('page-loader'),
  withHandlers(() => ({
    onRef: () => (ref: HTMLElement) => {
      if (!ref) {
        return
      }

      ref.addEventListener('transitionend', () => ref.remove(), { once: true })
      window.requestAnimationFrame(() => (ref.style.opacity = '0'))
    }
  }))
)(({ onRef }) => (
  <Loading
    innerRef={onRef}
    style={{
      pointerEvents: 'none',
      zIndex: 10,
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      transition: '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.175)',
      backgroundColor: theme.colours.panel
    }}
  />
))
