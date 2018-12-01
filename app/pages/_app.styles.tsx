import Box from '@/components/Box'
import { BaphoTheme } from '@/theme'
import { between } from 'polished'
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
      background: ${theme.colours.scrollbarBg};
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colours.scrollbarHandle};
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

    html {
      color: ${theme.colours.base};
      font-weight: 400;
      font-family: ${theme.fonts.family.copy};
      font-size: ${theme.fonts.size};
      line-height: 1.75;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      background: fixed ${theme.colours.bg} center top / 100vw 100vh no-repeat;
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

    [data-id='tooltip'] {
      font-size: 11px;
      padding: 2px 8px;
      transition: none;
    }
  `}
`

export const Main = styled<any>(Box)`
  --offset: calc(var(--pad) * 3);

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  padding: var(--offset);

  @media (min-width: 1025px) {
    height: 100vh;
    overflow: hidden;
  }

  ${({ theme }: BaphoTheme) => css`
    #app {
      position: relative;
      width: 100%;
      border: 1px solid transparent;
      border-radius: 10px;
      box-shadow: 0 17px 50px -5px #040617, 0 17px 150px -10px #040617;
      background: ${theme.colours.panelBg};
      background-blend-mode: overlay;

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
    a[href] {
      cursor: pointer;
      color: ${theme.colours.base};
      text-decoration: none;
      transition: ${theme.eases.base};
      &:hover {
        color: ${theme.colours.secondary};
      }
    }
    .dragging a[href] {
      pointer-events: none !important;
    }
  `}
`
