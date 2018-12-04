import { lighten } from 'polished'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }) => css`
    width: 70%;
    text-align: left;

    > div {
      padding: calc(var(--pad) / 4) 0;
    }

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
      align-self: stretch;
      flex: 0.282;
      margin: 0;
      background: ${lighten(0.33, theme.colours.secondary)};

      .row:not(:hover) & {
        transition: ${theme.eases.base};
      }

      .row:not(:hover):not([data-checked]) & {
        opacity: 0.65;

        img {
          filter: grayscale(1);
          mix-blend-mode: color-burn;
          background: ${lighten(0.33, theme.colours.secondary)};
        }
      }

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        transition: inherit;
      }
    }

    figure + div {
      flex: 3;
    }
  `}
`
