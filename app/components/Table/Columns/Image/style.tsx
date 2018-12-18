import { darken, getLuminance, lighten } from 'polished'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Box)`
  ${({ theme }) => css`
    padding: 0 !important;
    height: inherit;

    figure {
      position: relative;
      margin: 0;
      width: 100%;
      height: 100%;
      background-color: ${getLuminance(
        lighten(0.35, theme.colours.secondary)
      ) >= 0.66
        ? darken(0.2, theme.colours.secondary)
        : lighten(0.35, theme.colours.secondary)};

      article:not(:hover) & {
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
