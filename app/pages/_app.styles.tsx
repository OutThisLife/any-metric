import Box from '@/components/Box'
import { between } from 'polished'
import styled, { createGlobalStyle, css } from 'styled-components'
import { BaphoTheme } from 'typings'

export default createGlobalStyle`
  ${({ theme: { colours, fonts } }: BaphoTheme) => css`
    :root {
      --cellSize: calc(100vw / 40);
      --pad: ${between('8px', '16px')};
    }

    ::selection {
      color: #fff;
      background: #f36;
    }

    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
      background: ${colours.scrollbarBg};
    }

    ::-webkit-scrollbar-thumb {
      background: ${colours.scrollbarHandle};
    }

    body,
    html {
      color: ${colours.base};
      font-weight: 400;
      font-family: ${fonts.family.copy};
      line-height: 1.75;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      margin: 0;
      padding: 0;
    }

    body {
      background: fixed ${colours.bg} center top / 100vw 100vh no-repeat;
    }

    * {
      box-sizing: border-box;
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
  --offset: calc(var(--pad) * 4);

  ${({ theme: { colours } }: BaphoTheme) => css`
    box-shadow: 0 17px 50px -5px #040617;

    &:before,
    &:after {
      pointer-events: none;
      content: '';
      position: fixed;
      right: calc(var(--offset) / 2.1);
      left: calc(var(--offset) / 2.1);
    }

    &:before {
      z-index: -1;
      top: calc(var(--offset) / 2);
      bottom: calc(var(--offset) / 2);
      width: 90%;
      margin: auto;
      box-shadow: 0 17px 150px -10px #040617;
    }

    &:after {
      z-index: 500;
      bottom: calc(var(--offset) / 2.4);
      height: calc(var(--offset) * 2);
      border-radius: inherit;
      background: linear-gradient(
        180deg,
        transparent 22%,
        ${colours.panel} 82%,
        ${colours.panel}
      );
    }
  `}
`
