import { between } from 'polished'

export const colours = {
  base: '#323648',
  secondary: '#c60eff',
  bg: '#fff',
  panel: '#F6F8F9',

  get brand() {
    return this.base
  }
}

export const fonts = {
  copy: between('11px', '13px', '320px', '1600px'),
  h1: between('42px', '98px', '320px', '1600px'),
  h2: between('24px', '36px', '320px', '1600px'),

  family: {
    title: 'Old Standard',
    copy: 'Rubik',
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
