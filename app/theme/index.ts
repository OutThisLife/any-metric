import { defaultTheme } from 'evergreen-ui'
import globalHash from 'evergreen-ui/commonjs/avatar/src/utils/hash'
import { between } from 'polished'

const { scales: egScales, colors: egColours, palette: egPalette } = defaultTheme

export const colours = {
  base: '#DFDFDF',
  secondary: '#CB6EA7',
  tertiary: '#5FF0CB',
  muted: '#7C87A3',
  border: '#212B4D',
  bg: 'linear-gradient(20deg, #313756 50%, #6A7799)',

  panel: '#0C1029',
  panelBg:
    'radial-gradient(circle at 50% 20%, #a7abb5, transparent 70%), linear-gradient(20deg, #0C1029 50%, #212D4F)',
  panelBorder: 'linear-gradient(60deg, #0c1029, #212d4f)',

  scrollbarHandle: '#6F7A9B',
  scrollbarBg: '#1A2243',

  brand: 'linear-gradient(90deg, #7648c2, #ff8d92)'
}

export const fonts = {
  copy: between('11px', '13px', '320px', '1600px'),
  h1: between('42px', '98px', '320px', '1600px'),
  h2: between('24px', '36px', '320px', '1600px'),

  family: {
    title: '"SF UI Display", sans-serif',
    get copy() {
      return `\"SF UI Text\", ${this.title}`
    }
  }
}

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

// ---------------------------

export default {
  colours,
  fonts,

  egScales,
  egColours,
  egPalette
}
