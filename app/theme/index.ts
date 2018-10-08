import { between, rgba } from 'polished'
import { css } from 'styled-components'

export const colours = {
  base: '#323648',
  secondary: '#c60eff',
  bg: '#fff',
  panel: '#F6F8F9',

  good: 'rgb(97, 205, 187)',
  bad: 'rgb(244, 117, 96)',

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

export const focusStyles = css`
  outline: 1px solid ${colours.secondary};
  box-shadow: 0 0 10px ${rgba(colours.secondary, 0.3)};
`

// ---------------------------

export default {
  colours,
  fonts
}

export { default as victoryTheme } from './victory'
