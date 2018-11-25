import Particles from 'react-particles-js'

export default () => (
  <Particles
    style={{
      zIndex: 100,
      pointerEvents: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      'mix-blend-mode': 'overlay'
    }}
    params={{
      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
            value_area: 400
          }
        },
        move: {
          enable: false
        },
        shape: {
          type: 'triangle'
        },
        opacity: {
          value: 0.15
        },
        line_linked: {
          opacity: 0.15
        }
      },
      interactivity: {
        events: {
          onclick: { enable: false },
          onhover: { enable: false }
        }
      }
    }}
  />
)
