import { BaphoTheme } from '@/theme'
import { between, darken, rgba, shade } from 'polished'
import { Box } from 'rebass'
import styled, { createGlobalStyle, css, keyframes } from 'styled-components'

export default createGlobalStyle`
  ${({ theme }: BaphoTheme) => css`
    :root {
      --cellSize: calc(100vw / 40);
      --pad: ${between('4px', '8px')};
      --offset: calc(var(--pad) * 3);
      --radius: 2px;

      --mainGrid: 20vw minmax(70vw, 1fr);

      @media (max-width: 1025px) {
        --mainGrid: max-content 1fr;
      }
    }

    ::selection {
      color: ${theme.colours.base};
      background: ${theme.colours.secondary};
    }

    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
      background: transparent;
    }

    *:hover::-webkit-scrollbar {
      background: ${theme.colours.scrollbarBg};
    }

    ::-webkit-scrollbar-corner {
      background: ${darken(0.5, theme.colours.scrollbarBg)};
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colours.scrollbarHandle};
    }

    *:not(:hover)::-webkit-scrollbar-thumb {
      background: ${rgba(theme.colours.scrollbarHandle, 0.05)};
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

    body * {
      font-size: 1rem;
      font-family: ${theme.fonts.family}, -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
      box-sizing: border-box;
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
      color: ${theme.colours.base};
      text-decoration: none;
      transition: ${theme.eases.base};

      &:hover {
        color: ${theme.colours.focus};
      }

      &:visited:not(:hover) {
        color: ${shade(0.5, theme.colours.base)};
      }
    }

    .dragging * {
      pointer-events: none !important;
    }
  `}
`

export const Main = styled<any>(Box)`
  display: grid;
  grid-template: 'head' 'main';
  grid-template-rows: min-content 1fr;
  align-items: flex-start;
  justify-content: center;
  width: 100vw;
  padding: var(--offset);
  padding-top: 0;

  ${({ theme }: BaphoTheme) => css`
    > main {
      grid-area: main;
      position: relative;
      width: 100%;

      @media (max-width: 1025px) {
        width: calc(90vw - var(--offset));
      }

      .up {
        color: ${theme.colours.price.up} !important;
      }
      .down {
        color: ${theme.colours.price.down} !important;
      }
      .hl {
        color: ${theme.colours.price.hl} !important;
      }
      .dead {
        color: ${theme.colours.muted} !important;
      }
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
