import Particles, { IParticlesParams } from 'react-particles-js'
import { compose, defaultProps, setDisplayName } from 'recompose'

import defaultParams from './params'

export default compose<ParticleProps, {}>(
  defaultProps<ParticleProps>({ params: defaultParams }),
  setDisplayName('particles')
)(props => (
  <Particles
    {...props}
    style={{
      opacity: 0.2,
      zIndex: 100,
      pointerEvents: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      mixBlendMode: 'soft-light'
    }}
  />
))

interface ParticleProps {
  params: Partial<IParticlesParams>
}
