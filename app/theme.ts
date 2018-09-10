import { darken, lighten, rgba } from 'polished'

export const colours = {
  base: '#111',
  brand: '#000',

  border: '#f3f3f3',
  outline: '#D64E43',
  bg: '#fff',

  success: '#08663A',
  error: '#973030'
}

export const fonts = {
  colour: colours.base,
  family: 'Lato, serif',
  size: '14px',

  brand: {
    colour: colours.brand,
    family: 'Lora, sans-serif'
  },

  headers: {
    family: 'Lora, sans-serif'
  }
}

export const header = {
  bg: colours.bg,
  border: colours.border
}

export const sidebar = {
  bg: colours.bg,
  border: rgba(colours.border, 0.7),

  link: {
    colour: rgba(colours.base, 0.8),

    hover: {
      colour: colours.base,
      bg: colours.border
    }
  }
}

export const scrollbar = {
  thumb: darken(0.15, colours.border),
  bg: colours.border
}

// ---------------------------

export const links = {
  colour: '#1F51C7',
  get active() {
    return lighten(0.52, this.colour)
  }
}

export const buttons = {
  size: 12,
  radius: 100,
  colour: colours.base,
  bg: colours.bg,

  hover: {
    bg: rgba(colours.base, 0.02)
  }
}

export const inputs = {
  colour: colours.base,
  border: rgba(colours.base, 0.1),
  radius: 0.3,
  bg: 'transparent',

  focus: {
    border: colours.base
  }
}

// ---------------------------

export default {
  colours,

  header,
  sidebar,

  fonts,
  links,

  inputs,
  buttons,
  scrollbar
}
