import { desaturate, invert, lighten, rgba, shade, tint } from 'polished'
import { ThemeProps } from 'styled-components'

export const siteName = '$ɮΔքɦօʍɛ✞ʀɨƈ'

export const between = (min = 1, max = 2, vmin = 400, vmax = 2000) =>
  `calc(${min}px + (${max} - ${min}) * (100vw - ${vmin}px) / ${vmax - vmin})`

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
      return shade(0.1, desaturate(0.8, this.secondary))
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
    size: between(10, 13),
    list: ['Lato'],

    get src() {
      const url = 'https://fonts.googleapis.com/css?family'
      return `${url}=${this.list.join('|').replace(/\s+/g, '+')}`
    },

    get family() {
      return this.list.join(',')
    }
  }

  const eases = {
    easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    delay: '0.125s',

    get base() {
      return `0.234s ${this.easing}`
    }
  }

  return {
    colours,
    fonts,
    eases
  }
}

// ---------------------------

const theme = createTheme('#6236ba')
export type BaphoTheme = Partial<ThemeProps<typeof theme>>
export default theme
