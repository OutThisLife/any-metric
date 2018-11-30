import { MeasuredComponentProps, withContentRect } from 'react-measure'
import Particles, { IParticlesParams } from 'react-particles-js'
import { compose, setDisplayName, withPropsOnChange } from 'recompose'

import defaultParams from './params'

export default compose<ParticleProps, {}>(
  withContentRect('bounds'),
  withPropsOnChange<ParticleProps, ParticleProps>(
    ['contentRect'],
    ({ contentRect }) => {
      const params = defaultParams

      const b = contentRect.bounds.width > 1025
      // params.interactivity.events.onhover.enable = b
      // params.particles.move.enable = b

      return { params }
    }
  ),
  setDisplayName('particles')
)(({ measureRef, params }) => (
  <div
    ref={measureRef}
    style={{
      opacity: 0.2,
      zIndex: 100,
      pointerEvents: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      mixBlendMode: 'soft-light'
    }}>
    <Particles params={params} />
  </div>
))

interface ParticleProps extends Partial<MeasuredComponentProps> {
  params: Partial<IParticlesParams>
}
