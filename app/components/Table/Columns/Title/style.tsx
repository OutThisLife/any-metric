import { lighten } from 'polished'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }) => css`
    a[href] svg {
      width: 13px;
      margin: 0 0 0 5px;
      color: ${theme.colours.label};
      transition: ${theme.eases.base};
    }

    a[href][target]:not(:hover) + a svg {
      opacity: 0;
      transform: translate(8px, 0);
    }

    figure {
      flex-basis: 35;
      width: 30px;
      height: 30px;
      margin: 0;
      overflow: hidden;
      background: ${lighten(0.33, theme.colours.secondary)};

      .row:not(:hover) & {
        transition: ${theme.eases.base};
      }

      .row:not(:hover):not([data-checked]) & {
        opacity: 0.65;

        img {
          filter: grayscale(1);
          mix-blend-mode: color-burn;
        }
      }

      img {
        object-fit: cover;
        transform: translateZ(0);
        transition: inherit;
      }
    }
  `}
`
