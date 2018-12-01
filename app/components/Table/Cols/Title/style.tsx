import { lighten } from 'polished'
import styled, { css } from 'styled-components'

import { Cols } from '..'

export default styled<any>(Cols)`
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
      width: 30px;
      height: 30px;
      overflow: hidden;
      background: ${lighten(0.33, theme.colours.secondary)};

      .row:not(:hover):not([data-checked]) & {
        opacity: 0.65;
        transition: ${theme.eases.base};

        img {
          filter: grayscale(1);
          mix-blend-mode: color-burn;
          transition: ${theme.eases.base};
        }
      }

      img {
        object-fit: cover;
        transform: translateZ(0);
      }
    }
  `}
`
