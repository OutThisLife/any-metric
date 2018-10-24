import { defaultTheme } from 'evergreen-ui'
import globalHash from 'evergreen-ui/commonjs/avatar/src/utils/hash'
import { between } from 'polished'

const { scales: egScales, colors: egColours, palette: egPalette } = defaultTheme

export const colours = {
  base: egColours.text.default,
  secondary: egColours.text.selected,
  panel: egScales.neutral.N1,
  bg: '#fff',

  good: egColours.text.success,
  bad: egColours.text.danger,
  label: egPalette.yellow.base,

  get brand() {
    return this.base
  }
}

export const fonts = {
  copy: between('11px', '13px', '320px', '1600px'),
  h1: between('42px', '98px', '320px', '1600px'),
  h2: between('24px', '36px', '320px', '1600px'),

  family: {
    title:
      'SF UI Display,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
    get copy() {
      return `SF UI Text, ${this.title}`
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
