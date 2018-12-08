import { BaphoTheme } from '@/theme'
import { between, darken, rgba, shade } from 'polished'
import { Box } from 'rebass'
import styled, { createGlobalStyle, css, keyframes } from 'styled-components'

export default createGlobalStyle`
  ${({ theme }: BaphoTheme) => css`
    :root {
      --cellSize: calc(100vw / 40);
      --pad: ${between('8px', '16px')};

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

    html {
      color: ${theme.colours.base};
      font-weight: 400;
      font-size: ${theme.fonts.size};
      line-height: 1.75;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      background: ${shade(0.9, darken(0.1, theme.colours.secondary))};
    }

    body * {
      font-size: 1rem;
      font-family: ${theme.fonts.family}, -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
      box-sizing: border-box;

      &:focus {
        outline: none;
      }
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
    }

    .row {
      user-select: none;

      .dragging & * {
        pointer-events: none !important;
      }
    }
  `}
`

export const Main = styled<any>(Box)`
  --offset: calc(var(--pad) * 3);
  --radius: 2px;

  display: grid;
  grid-template: 'head' 'main';
  grid-template-rows: min-content 1fr;
  align-items: flex-start;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  padding: var(--offset);
  padding-top: 0;

  @media (min-width: 1025px) {
    height: 100vh;
    overflow: hidden;
  }

  ${({ theme }: BaphoTheme) => css`
    > main {
      grid-area: main;
      position: relative;
      width: 100%;
      border: 1px solid transparent;
      border-radius: calc(var(--radius) * 5);
      box-shadow: 0 17px 50px -5px ${rgba(theme.colours.panel, 0.7)},
        0 17px 150px -10px ${rgba(theme.colours.panel, 0.7)};
      background: ${theme.colours.panel};

      @media (min-width: 1025px) {
        height: 100%;
        overflow: hidden;
        padding: calc(var(--pad)) 0;

        &:after {
          z-index: 9;
          pointer-events: none;
          content: '';
          position: absolute;
          right: 0;
          left: 0;
          bottom: 0;
          height: 20%;
          border-radius: inherit;
          background: linear-gradient(
            180deg,
            transparent 22%,
            ${theme.colours.panel} 82%,
            ${theme.colours.panel}
          );
        }
      }
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
      h5 {
        font-weight: 600;
        font-size: 0.9rem;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
    }
  `}
`

export const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

export const fadeOut = keyframes`
  100% { opacity: 0; }
`

export const animIn = keyframes`
  0% { opacity: 0; transform: scale(0.98); }
  100% { opacity: 1; transform: none }
`

export const animOut = keyframes`
  100% { opacity: 0; transform: scale(0.98); }
`
