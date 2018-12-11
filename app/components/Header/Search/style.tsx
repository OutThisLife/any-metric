import * as Form from '@/components/Form'
import { animIn, animOut } from '@/pages/_app.styles'
import { BaphoTheme } from '@/theme'
import styled, { css } from 'styled-components'

export default styled<any>(Form.Container)`
  ${({ theme }: BaphoTheme) => css`
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
        padding-left: var(--pad);
      }
    }
  `}
`
