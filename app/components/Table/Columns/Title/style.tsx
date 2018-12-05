import { lighten } from 'polished'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }) => css`
    width: calc(100% / 1.7);

    a[href] svg {
      width: 13px;
      margin: 0 0 0 5px;
      color: ${theme.colours.label};
      transition: ${theme.eases.base};

      .row:not(:hover) &:last-of-type {
        opacity: 0;
        transform: translate(8px, 0);
      }
    }

    figure {
      align-self: stretch;
      flex: 1.77;
      margin: 0;
      background: ${lighten(0.35, theme.colours.secondary)};

      .row:not(:hover) & {
        filter: grayscale(0.4);
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
        height: 100%;
        width: 100%;
        transition: inherit;
      }
    }

    figure + div {
      flex: 8.23;
      padding: var(--pad);
    }
  `}
`
