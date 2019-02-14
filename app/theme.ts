import { darken, lighten, rgba, tint } from 'polished'
import { ThemeProps } from 'styled-components'

export const siteName = '$ɮΔք𝔥Ø𝔪Δ✞ʀɨჯ'

export const between = (min = 1, max = 2, vmin = 400, vmax = 2000) =>
  `calc(${min}px + (${max} - ${min}) * (100vw - ${vmin}px) / ${vmax - vmin})`

export const createTheme = () => {
  const colours = {
    base: '#111',
    panel: '#fff',
    secondary: '#1A73E8',
    focus: '#1A73E8',

    get module() {
      return darken(0.03, this.panel)
    },

    get muted() {
      return lighten(0.2, this.base)
    },

    get label() {
      return lighten(0.4, this.base)
    },

    get border() {
      return darken(0.1, this.panel)
    },

    get scrollbarHandle() {
      return rgba(this.secondary, 0.3)
    },

    get scrollbarBg() {
      return tint(0.01, this.module)
    },

    price: {
      up: '#188038',
      down: '#C53929',
      hl: '#E6C78B'
    }
  }

  const fonts = {
    size: between(10, 13),
    list: ['Arial', 'sans-serif'],

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

const theme = createTheme()

export type BaphoTheme = Partial<ThemeProps<typeof theme>>
export default theme
