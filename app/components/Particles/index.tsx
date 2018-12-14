import { MeasuredComponentProps, withContentRect } from 'react-measure'
import Particles, { IParticlesParams } from 'react-particles-js'
import { compose, setDisplayName, withPropsOnChange } from 'recompose'

import defaultParams from './params'

export default compose<ParticleProps & MeasuredComponentProps, {}>(
  setDisplayName('particles'),
  withContentRect('bounds'),
  withPropsOnChange<ParticleProps, ParticleProps & MeasuredComponentProps>(
    ['contentRect'],
    ({ contentRect }) => {
      const params = defaultParams

      const b =
        contentRect.bounds.width > 1025 &&
        document.visibilityState === 'visible'

      params.particles.color.value = '#fafafa'
      params.particles.line_linked.color = params.particles.color.value
      params.interactivity.events.onhover.enable = b
      params.particles.move.enable = b

      return { params }
    }
  )
)(({ measureRef, params, contentRect: { bounds: { width, height } } }) => (
  <div
    ref={measureRef}
    id="particles"
    style={{
      zIndex: 100,
      pointerEvents: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      mixBlendMode: 'soft-light'
    }}>
    <Particles
      params={params}
      width={width + 'px'}
      height={height + 'px'}
      style={{
        opacity: 0.2
      }}
    />
  </div>
))

interface ParticleProps {
  params: Partial<IParticlesParams>
}
