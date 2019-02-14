import { BaphoTheme } from '@/theme'
import { between, lighten } from 'polished'
import { createGlobalStyle, css, keyframes } from 'styled-components'

export default createGlobalStyle`
  ${({ theme }: BaphoTheme) => css`
    :root {
      --cellSize: calc(100vw / 40);
      --pad: ${between('4px', '8px')};
      --offset: calc(var(--pad) * 3);
      --radius: 2px;
    }

    ::selection {
      color: ${theme.colours.base};
      background: ${theme.colours.secondary};
    }

    html,
    body {
      margin: 0;
      padding: 0;
    }

    html {
      color: ${theme.colours.base};
      font-weight: 400;
      font-size: ${theme.fonts.size};
      line-height: 1.75;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      background: ${theme.colours.panel};

      * {
        font-size: 1rem;
        font-family: ${theme.fonts.family}, -apple-system, BlinkMacSystemFont,
          'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
          'Helvetica Neue', sans-serif;
        box-sizing: border-box;
      }
    }

    :focus {
      outline: none;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    input[type],
    button[type] {
      font-family: ${theme.fonts.family};
    }

    h5 {
      color: ${theme.colours.muted};
      font-weight: 600;
      font-size: 0.9rem;
      text-transform: uppercase;
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
      margin: 0;
      border: 0;
    }

    a[href] {
      cursor: pointer;
      color: ${theme.colours.secondary};
      text-decoration: none;

      &:hover {
        color: ${theme.colours.secondary};
        text-decoration: underline;
      }

      &:visited {
        color: ${lighten(0.5, theme.colours.secondary)};
      }
    }

    .dragging * {
      pointer-events: none !important;
    }

    .up {
      color: ${theme.colours.price.up} !important;
    }

    .down {
      color: ${theme.colours.price.down} !important;
    }

    .dead {
      color: ${theme.colours.muted} !important;
    }
  `}
`

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

export const animIn = keyframes`
  from { opacity: 0; transform: scale(0.98); }
`

export const animOut = keyframes`
  to { opacity: 0; transform: scale(0.98); }
`

export const spin = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`
