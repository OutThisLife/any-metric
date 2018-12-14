import Particles, { IParticlesParams } from 'react-particles-js'
import {
  branch,
  compose,
  renderComponent,
  setDisplayName,
  withHandlers,
  withState
} from 'recompose'

import defaultParams from './params'

export default compose<ParticleProps, {}>(
  setDisplayName('particles'),
  branch(() => !('browser' in process), renderComponent(() => null)),
  withState('params', 'setParams', defaultParams),
  withHandlers(() => ({
    onRef: ({ params, setParams }) => ref => {
      if (!ref) {
        return
      }

      const el = ref as HTMLElement

      el.style.pointerEvents = 'none'
      el.style.zIndex = '100'
      el.style.pointerEvents = 'none'
      el.style.position = 'fixed'
      el.style.top = '0'
      el.style.left = '0'
      el.style.width = '100%'
      el.style.height = '100%'
      ;(el.style as any).mixBlendMode = 'soft-light'

      const maybeFreeze = () => {
        const b =
          window.innerWidth > 1025 && document.visibilityState === 'visible'

        params.particles.color.value = '#fafafa'
        params.particles.line_linked.color = params.particles.color.value
        params.interactivity.events.onhover.enable = b
        params.particles.move.enable = b

        window.requestAnimationFrame(() => setParams(params))
      }

      window.requestAnimationFrame(maybeFreeze)
      document.addEventListener('visibilitychange', maybeFreeze)
      window.addEventListener('resize', maybeFreeze)
    }
  }))
)(({ onRef, params }) => (
  <div ref={onRef} id="particles">
    <Particles
      params={params}
      width={window.innerWidth + 'px'}
      height={window.innerHeight + 'px'}
      style={{
        opacity: 0.2
      }}
    />
  </div>
))

interface ParticleProps {
  onRef?: (r: HTMLElement) => void
  freeze?: () => void
  params: Partial<IParticlesParams>
  setParams: (p: ParticleProps['params']) => void
}
