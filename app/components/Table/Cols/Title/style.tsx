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

    a[href][target]:hover + a {
      color: ${theme.colours.secondary};
    }

    figure img {
      width: 100%;
      filter: grayscale(1) opacity(0.5);
      transform: translateZ(0);
      transition: ${theme.eases.base};

      .row:hover &,
      .row[data-checked] & {
        filter: none;
      }
    }
  `}
`
