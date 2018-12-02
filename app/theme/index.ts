import {
  between,
  desaturate,
  invert,
  lighten,
  rgba,
  shade,
  timingFunctions,
  tint
} from 'polished'
import { ThemeProps } from 'styled-components'

export const createTheme = (secondary: string) => {
  const colours = {
    base: '#fafafa',
    panel: '#0A0F14',
    secondary,

    get module() {
      return lighten(0.021, this.panel)
    },

    get focus() {
      return invert(this.secondary)
    },

    get muted() {
      return desaturate(0.4, tint(0.1, this.secondary))
    },

    get label() {
      return desaturate(0.4, shade(0.5, this.secondary))
    },

    get border() {
      return lighten(0.1, this.panel)
    },

    get scrollbarHandle() {
      return rgba(this.secondary, 0.3)
    },

    get scrollbarBg() {
      return tint(0.01, this.module)
    },

    price: {
      up: '#73AD0D',
      down: '#E60A00',
      hl: '#f4c37d'
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
    bg: colours.panel,
    border: colours.border,
    button: invert(colours.secondary)
  }

  const eases = {
    easing: timingFunctions('easeInSine'),

    get base() {
      return `0.15s ${this.easing}`
    }
  }

  return {
    breakpoints: [1025, 1024, 768],
    colours,
    fonts,
    inputs,
    eases
  }
}

// ---------------------------

const theme = createTheme('#6236ba')

export type BaphoTheme = Partial<ThemeProps<typeof theme>>
export default theme
