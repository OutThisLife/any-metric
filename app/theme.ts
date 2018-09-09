import { darken, rgba } from 'polished'

export const colours = {
  base: '#111',
  brand: '#D64E43',

  border: '#f3f3f3',
  outline: '#D64E43',
  bg: '#fafafa',

  success: '#08663A',
  error: '#973030'
}

export const fonts = {
  colour: colours.base,
  family: 'Roboto, Arial, sans-serif',
  size: '14px',

  brand: {
    colour: colours.brand,
    family: 'monospace'
  },

  headers: {
    family: 'Noto Serif JP, sans-serif'
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

export const main = {
  bg: darken(0.05, colours.bg)
}

export const scrollbar = {
  thumb: '#C6C6C6',
  bg: '#F8F8F8',
  border: colours.border
}

// ---------------------------

export const links = {
  colour: '#1F51C7'
}

export const buttons = {
  size: 12,
  radius: 4,

  primary: {
    colour: colours.base,
    bg: 'transparent',
    radius: 100,

    hover: {
      bg: rgba(colours.base, 0.02)
    }
  },

  default: {
    colour: colours.base,
    bg: '#f2f2f2',

    hover: {
      bg: darken(0.02, '#f2f2f2')
    }
  }
}

export const inputs = {
  colour: colours.base,
  border: rgba(colours.base, 0.1),
  radius: buttons.radius,
  bg: 'none',

  focus: {
    border: colours.base
  }
}

// ---------------------------

export default {
  colours,

  header,
  sidebar,
  main,

  fonts,
  links,

  inputs,
  buttons,
  scrollbar
}
