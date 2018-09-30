import { between } from 'polished'

export const colours = {
  base: '#1C212A',
  bg: '#fff',

  secondary: '#11A6F2',
  border: '#F8F7F5',
  panel: '#F6F8F9',

  brand: {
    colour: '#B3FFCD',
    bg: '#E21D1B'
  }
}

export const fonts = {
  copy: between('9px', '12px', '320px', '1600px'),
  h1: between('42px', '98px', '320px', '1600px'),
  h2: between('24px', '36px', '320px', '1600px'),

  family: {
    title: 'Abril Fatface',
    copy: 'Roboto',
    src() {
      const fmt = (s: string): string => s.replace(' ', '+')
      return `//fonts.googleapis.com/css?family=${fmt(this.title)}|${fmt(this.copy)}`
    }
  }
}

// ---------------------------

export default {
  colours,
  fonts
}
