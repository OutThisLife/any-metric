import { BaphoTheme } from '@/theme'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Box)`
  ${({ theme }: BaphoTheme) => css`
    position: relative;

    > div {
      &:before {
        z-index: 1;
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 50%;
        background: linear-gradient(
          90deg,
          transparent,
          ${theme.colours.panel} 80%
        );
      }

      > div {
        z-index: 2;
        position: relative;
      }
    }

    label {
      font-size: 0.85rem;
    }

    a[href][class*='menu-'] {
      color: ${theme.colours.label};

      &.menu-true {
        color: ${theme.colours.secondary};
      }
    }
  `}
`
