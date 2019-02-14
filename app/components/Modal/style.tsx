import { animIn, animOut, fadeIn, fadeOut } from '@/pages/_app.styles'
import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import { Flex } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Flex)`
  ${({ theme }: BaphoTheme) => css`
    z-index: 999;
    pointer-events: none;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    > a {
      cursor: zoom-out;
      z-index: 1;
      pointer-events: auto;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translate3d(0, 0, 0);
      animation: ${fadeIn} ${theme.eases.base} forwards;
      background: ${rgba(theme.colours.base, 0.33)};
    }

    &.anim-out > a {
      animation-name: ${fadeOut};
    }

    > div {
      z-index: 2;
      pointer-events: auto;
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      text-align: left;
      margin: auto;
      transform: translate3d(0, 0, 0);
      animation: ${animIn} 0.2s ${theme.eases.easing} forwards;

      img {
        vertical-align: top;
      }
    }

    &.anim-out > div {
      animation-name: ${animOut};
    }
  `}
`
