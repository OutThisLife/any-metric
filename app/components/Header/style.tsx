import { BaphoTheme } from '@/theme'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Box)`
  ${({ theme }: BaphoTheme) => css`
    grid-area: head;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--offset) var(--pad);

    h1 {
      color: ${theme.colours.base};
      font-size: 1.1rem;
      font-family: ${theme.fonts.family.title};
      text-transform: uppercase;
    }

    .picker {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: ${theme.eases.base};

      > a {
        display: inline-block;
        line-height: 0;
        vertical-align: middle;

        + * {
          z-index: 100;
          position: absolute !important;
          top: 100%;
          right: 0;

          > div {
            background: none !important;
          }

          .flexbox-fix {
            display: none !important;
          }
        }
      }

      .circle-picker:not(:hover) {
        opacity: 0.4;
      }

      .compact-picker span div[title] {
        width: 10px !important;
        height: 10px !important;
      }
    }

    form {
      input {
        z-index: 1;
      }

      button {
        z-index: 2;
      }
    }
  `}
`
