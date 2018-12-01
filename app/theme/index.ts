import { defaultTheme } from 'evergreen-ui'
import globalHash from 'evergreen-ui/commonjs/avatar/src/utils/hash'
import { between, darken, lighten, rgba, timingFunctions } from 'polished'
import { ThemeProps } from 'styled-components'

export const autoColour = <
  T extends {
    color: string
    backgroundColor: string
  }
>(
  s: string,
  isSolid: boolean = false
): T => {
  const res: T = defaultTheme.getAvatarProps({
    color: 'automatic',
    isSolid,
    hashValue: globalHash(s)
  })

  return res
}

export const createTextGradient = (colour: string, amt: number = 0.3) =>
  `linear-gradient(180deg, ${lighten(0.1, colour)} 42%, ${colour} 60%, ${darken(
    amt,
    colour
  )})`

// ---------------------------

const easing = timingFunctions('easeInOutQuad')

const theme = {
  colours: {
    base: '#DFDFDF',
    secondary: '#CB6EA7',
    focus: '#1C69DA',

    muted: '#9AA2C2',
    success: '#5CF0CB',
    label: '#3A477A',
    star: '#f4c37d',

    border: '#212B4D',
    bg: 'linear-gradient(20deg, #313756 50%, #6A7799)',

    panel: '#0C1029',
    panelBg: `radial-gradient(circle at 50% 20%, #a7abb5, transparent 70%),
      linear-gradient(20deg, #0C1029 50%, #212D4F)`,

    moduleBg: 'linear-gradient(180deg, #20294B, #171B38)',

    scrollbarHandle: rgba('#6F7A9B', 0.2),
    scrollbarBg: rgba('#212B4D', 0.2),

    brand: 'linear-gradient(90deg, #7648c2 10%, #EF74CC 50%, #ff8d92)',
    company: `linear-gradient(150deg, ${lighten(
      0.05,
      '#ff8d92'
    )} 10%, ${lighten(0.05, '#EF74CC')} 50%, ${lighten(0.05, '#7648c2')})`,

    price: {
      up: createTextGradient('#5CF0CB'),
      down: createTextGradient('#F67BB0'),
      neutral: createTextGradient('#f4c37d')
    }
  },

  fonts: {
    size: between('10px', '12px', '320px', '1600px'),

    family: {
      title: '"SF UI Display", sans-serif',
      get copy() {
        return `\"SF UI Text\", ${this.title}`
      }
    }
  },

  inputs: {
    bg: '#0D1227',
    border: '#3A477A',

    text: 'linear-gradient(180deg, transparent, #7F53C9)',
    button: 'linear-gradient(120deg, #E2808D, #BE65AD, #7F53C9)'
  },

  eases: {
    base: `0.15s ${easing}`,
    button: `0.25s ${easing}`,
    buttonGradient: `opacity 0.1s ${easing}, transform 0.125s ${easing}, background 0.15s ${easing}`
  }
}

export type BaphoTheme = ThemeProps<typeof theme>

export default theme
