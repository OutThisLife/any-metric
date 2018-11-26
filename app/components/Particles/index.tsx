import Particles from 'react-particles-js'

import params from './params.ts'

export default () => (
  <Particles
    style={{
      opacity: 0.2,
      zIndex: 100,
      pointerEvents: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      mixBlendMode: 'soft-light'
    }}
    params={params}
  />
)
