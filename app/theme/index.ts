import { defaultTheme } from 'evergreen-ui'
import globalHash from 'evergreen-ui/commonjs/avatar/src/utils/hash'
import { between, darken, lighten } from 'polished'

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

export const createTextGradient = (colour: string) =>
  `linear-gradient(180deg, ${lighten(0.1, colour)} 42%, ${colour} 50%, ${darken(
    0.5,
    colour
  )})`

// ---------------------------

const colours = {
  base: '#DFDFDF',
  secondary: '#CB6EA7',
  tertiary: '#5FF0CB',
  focus: '#1C69DA',

  muted: '#9AA2C2',
  label: '#3A477A',

  border: '#212B4D',
  bg: 'linear-gradient(20deg, #313756 50%, #6A7799)',

  panel: '#0C1029',
  panelBg:
    'radial-gradient(circle at 50% 20%, #a7abb5, transparent 70%), linear-gradient(20deg, #0C1029 50%, #212D4F)',

  scrollbarHandle: '#6F7A9B',
  scrollbarBg: '#1A2243',

  brand: 'linear-gradient(90deg, #7648c2 10%, #EF74CC 50%, #ff8d92)',

  price: {
    up: createTextGradient('#5CF0CB'),
    down: createTextGradient('#F67BB0')
  }
}

const fonts = {
  size: between('10px', '12px', '320px', '1600px'),

  family: {
    title: '"SF UI Display", sans-serif',
    get copy() {
      return `\"SF UI Text\", ${this.title}`
    }
  }
}

const inputs = {
  bg: '#0D1227',
  border: '#3A477A',

  checkbox: colours.base,
  radio: 'linear-gradient(40deg, #E2808D, #BE65AD, #7F53C9)',
  button: 'linear-gradient(40deg, #E2808D, #BE65AD, #7F53C9)',
  text: 'linear-gradient(180deg, transparent, #7F53C9)'
}

// ---------------------------

export default {
  colours,
  fonts,
  inputs
}
