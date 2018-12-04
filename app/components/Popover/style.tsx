import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import { Flex } from 'rebass'
import styled, { css, keyframes } from 'styled-components'

const animIn = keyframes`
  0% { opacity: 0; transform: scale(0.95) }
  100% { opacity: 1; transform: none }
`

const animOut = keyframes`
  100% { opacity: 0; transform: scale(0.95) }
`

export default styled<any>(Flex)`
  ${({ theme }: BaphoTheme) => css`
    z-index: 999;
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;

    > div {
      display: inline-block;
      overflow: hidden;
      margin: auto;
      border-radius: 2px;
      animation: ${animIn} 0.2s ${theme.eases.easing} forwards;
      box-shadow: 0 3px 5px 0 ${rgba(theme.colours.panel, 0.5)};

      img {
        max-width: 15vw;
        vertical-align: top;
      }
    }

    &.anim-out > div {
      animation-name: ${animOut};
    }
  `}
`
