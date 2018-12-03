import { BaphoTheme } from '@/theme'
import { between, darken, rgba, tint } from 'polished'
import { Box } from 'rebass'
import styled, { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
  ${({ theme }: BaphoTheme) => css`
    :root {
      --cellSize: calc(100vw / 40);
      --pad: ${between('8px', '16px')};
    }

    ::selection {
      color: ${theme.colours.base};
      background: ${theme.colours.label};
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

    * {
      cursor: crosshair;
      font-family: ${theme.fonts.family.copy};
      box-sizing: border-box;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    input[type],
    button[type] {
      font-family: ${theme.fonts.family.title};
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
      background: #000;
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

    input + button,
    select + button {
      margin-left: -3px !important;
      border-left: 0px !important;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }

    a[href] {
      cursor: pointer;
      color: ${theme.colours.base};
      text-decoration: none;
      transition: ${theme.eases.base};

      &:hover,
      &:hover + a[href] {
        color: ${tint(0.4, theme.colours.secondary)};
      }
    }

    .dragging a[href] {
      pointer-events: none !important;
    }

    [data-id='tooltip'] {
      font-size: 11px;
      padding: 2px 8px;
      transition: none;
    }
  `}
`

export const Main = styled<any>(Box)`
  --offset: calc(var(--pad) * 3);

  display: grid;
  grid-template: 'head' 'main';
  grid-template-rows: min-content 1fr;
  align-items: flex-start;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  padding: var(--offset);
  padding-top: calc(var(--offset) / 2);

  @media (min-width: 1025px) {
    height: 100vh;
    overflow: hidden;
  }

  ${({ theme }: BaphoTheme) => css`
    > main {
      grid-area: main;
      position: relative;
      width: 100%;
      padding: var(--offset) 0;
      border: 1px solid transparent;
      border-radius: 10px;
      box-shadow: 0 17px 50px -5px ${rgba(theme.colours.panel, 0.7)},
        0 17px 150px -10px ${rgba(theme.colours.panel, 0.7)};
      background: ${theme.colours.panel};

      @media (min-width: 1025px) {
        height: 100%;
        overflow: hidden;
      }

      @media (min-width: 1025px) {
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

      .up {
        color: ${theme.colours.price.up} !important;
      }

      .down {
        color: ${theme.colours.price.down} !important;
      }

      .hl {
        color: ${theme.colours.price.hl} !important;
      }
    }
  `}
`
