import { defaultTheme } from 'evergreen-ui'
import globalHash from 'evergreen-ui/commonjs/avatar/src/utils/hash'
import { between, rgba } from 'polished'
import { createGlobalStyle } from 'styled-components'

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

export const GlobalStyles = createGlobalStyle`
  :root {
    --cellSize: calc(100vw / 40);
    --pad: ${between('8px', '16px')};
  }

  body, html {
    color: ${colours.base};
    font-weight: 400;
    font-family: ${fonts.family.copy};
    text-shadow: 0 1px 0 ${rgba(colours.base, 0.1)};
    line-height: 1.75;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 3px;
      height: 3px;
      border: 1px ridge transparent;
      background: transparent;
    }

    &::-webkit-scrollbar:hover {
      border-color: ${rgba(colours.base, 0.1)};
      background: ${rgba(colours.base, 0.03)};
    }

    &::-webkit-scrollbar-thumb {
      transition: .15s ease-in-out;
      background: ${colours.base};

      *:not(:hover) & {
        background: ${rgba(colours.base, 0.2)};
      }
    }

    &::selection {
      color: #fff;
      background: ${colours.secondary};
    }
  }

  p,
  blockquote,
  ul,
  li {
    margin: 0;
    padding: 0;
  }

  img,
  svg,
  object,
  embed,
  video,
  audio,
  iframe {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }

  [data-id='tooltip'] {
    font-size: 11px;
    padding: 2px 8px;
    transition: none;
  }

  input + button,
  select + button {
    margin-left: -3px !important;
    border-left: 0px !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }

  a[href]:hover {
    color: ${colours.secondary};
  }

  #__next {
    display: grid;
    grid-template-areas:
      'head head head'
      'body body body'
      'body body body';
    grid-template-rows: min-content 1fr;
    grid-template-columns: 1fr;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    background: ${colours.panel};

    > header {
      grid-area: head;
      display: grid;
      grid-template-columns: minmax(auto, 200px) 1fr;
      grid-template-areas: 'logo nav nav';
      align-items: center;

      > div {
        grid-area: logo;
      }

      > nav {
        grid-area: nav;
      }
    }

    > section {
      align-self: stretch;
      grid-area: body;
      position: relative;
      overflow: auto;
      background: ${colours.panel};
    }
  }
`

// ---------------------------

export default {
  colours,
  fonts,

  egScales,
  egColours,
  egPalette
}
