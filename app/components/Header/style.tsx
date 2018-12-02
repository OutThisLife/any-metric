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

      &:not(:hover) {
        opacity: 0.4;
      }

      > a {
        display: inline-block;
        line-height: 0;
        vertical-align: middle;
      }

      .sketch-picker {
        z-index: 100;
        position: absolute;
        top: 100%;
        right: 0;
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
