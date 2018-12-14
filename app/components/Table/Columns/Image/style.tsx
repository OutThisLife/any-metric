import { lighten } from 'polished'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }) => css`
    padding: 0 !important;

    figure {
      position: relative;
      margin: 0;
      width: 80px;
      height: 80px;
      background: ${lighten(0.35, theme.colours.secondary)};

      .row:not(:hover) & {
        filter: grayscale(0.4);
        opacity: 0.65;
        transition: 1s ${theme.eases.easing};

        img {
          transition: inherit;

          + img {
            opacity: 0;
            filter: grayscale(1);
          }
        }
      }

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        mix-blend-mode: color-burn;

        &[src=''],
        &:not([src]) {
          opacity: 0.15;
        }

        + img {
          z-index: 1;
          pointer-events: none;
          position: absolute;
          top: 0;
          left: 0;
          mix-blend-mode: unset;
        }
      }
    }
  `}
`
