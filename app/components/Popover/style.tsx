import { BaphoTheme } from '@/theme'
import { Flex } from 'rebass'
import styled, { css, keyframes } from 'styled-components'

import { PopoverProps } from '.'

const animIn = keyframes`
  0% { opacity: 0; transform: scale(0.95) }
  100% { opacity: 1; transform: none }
`

const animOut = keyframes`
  100% { opacity: 0; transform: scale(0.95) }
`

export default styled<any>(Flex)`
  ${({ direction: dir, theme }: BaphoTheme & Partial<PopoverProps>) => css`
    pointer-events: none;
    position: fixed;

    > div {
      display: inline-block;
      overflow: hidden;
      margin: auto;
      border: 1px solid ${theme.colours.border};
      animation: ${animIn} 0.2s ${theme.eases.easing} forwards;

      ${dir === 'top' && 'transform-origin: center bottom'};
      ${dir === 'right' && 'transform-origin: left center'};
      ${dir === 'bottom' && 'transform-origin: center top'};
      ${dir === 'left' && 'transform-origin: right center'};

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
