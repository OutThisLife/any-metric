import * as Form from '@/components/Form'
import { animIn, animOut } from '@/pages/_app.styles'
import { BaphoTheme } from '@/theme'
import { timingFunctions } from 'polished'
import styled, { css, keyframes } from 'styled-components'

const shakeAnim = keyframes`
0% {
  transform: translate(-5px, 0);
}

50% {
  transform: translate(5px, 0);
}

100% {
  transform: translate(0, 0);
}
`

export default styled<any>(Form.Container)`
  ${({ theme }: BaphoTheme) => css`
    align-self: stretch;
    position: relative;
    transition: ${theme.eases.base};

    &.shake {
      animation: ${shakeAnim} 0.3s ${timingFunctions('easeInOutBack')};
    }

    &.loading [type],
    &.loading section nav {
      pointer-events: none;
      cursor: wait;
      filter: grayscale(1) opacity(0.5);
    }

    section {
      z-index: 100;
      position: absolute;
      top: 100%;
      right: 0;
      left: 0;
      animation: ${animIn} ${theme.eases.base} forwards;

      &.anim-out {
        animation-name: ${animOut};
      }

      > div {
        position: relative;
        z-index: 2;
        padding: var(--pad);
        overflow: hidden;
        border-radius: 0 0 var(--radius) var(--radius);
        transform-origin: left top;
        background: ${theme.colours.module};
      }
    }

    section nav a {
      display: flex;
      align-items: center;
      border: 1px solid ${theme.colours.border};

      &:hover {
        border-color: ${theme.colours.focus};
        transition: none;
      }

      figure {
        --size: 140px;

        width: var(--size);
        height: var(--size);
        margin: 0;
        background: ${theme.colours.module};

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      aside {
        flex: 1;
        padding: 0 var(--pad);
      }
    }
  `}
`
