import { getTheme } from '@/lib/queries'
import { BaphoTheme } from '@/theme'
import Particles, { IParticlesParams } from 'react-particles-js'
import {
  branch,
  compose,
  renderComponent,
  setDisplayName,
  withHandlers,
  withPropsOnChange,
  withState
} from 'recompose'

import defaultParams from './params'

export default compose<ParticleProps, {}>(
  setDisplayName('particles'),
  branch(() => !('browser' in process), renderComponent(() => null)),
  getTheme(),
  withState('params', 'setParams', defaultParams),
  withHandlers<ParticleProps, ParticleProps>(() => ({
    onRef: ({ params, setParams }) => ref => {
      if (!ref) {
        return
      }

      const el = ref as HTMLElement

      el.style.zIndex = '9999'
      el.style.pointerEvents = 'none'
      el.style.opacity = '0.5'
      el.style.position = 'fixed'
      el.style.top = '0'
      el.style.left = '0'
      el.style.width = '100%'
      el.style.height = '100%'
      ;(el.style as any).mixBlendMode = 'color-dodge'

      const max = Math.max(window.innerWidth, window.innerHeight)

      params.particles.number.value = max / (5 * window.devicePixelRatio)
      params.particles.number.density.value_area = max * 2
      params.particles.line_linked.color = params.particles.color.value
      params.interactivity.events.onhover.enable = true
      params.particles.move.enable = true

      window.requestAnimationFrame(() => setParams(params))
    }
  })),
  withPropsOnChange<ParticleProps, ParticleProps & BaphoTheme>(
    ['theme'],
    ({ theme, params }) => {
      params.particles.color.value = theme.colours.secondary
      return { params }
    }
  )
)(({ onRef, params }) => (
  <div ref={onRef} id="particles">
    <Particles
      params={params}
      width={window.innerWidth + 'px'}
      height={window.innerHeight + 'px'}
    />
  </div>
))

interface ParticleProps {
  onRef?: (r: HTMLElement) => void
  freeze?: () => void
  params?: Partial<IParticlesParams>
  setParams?: (p: ParticleProps['params']) => void
}
