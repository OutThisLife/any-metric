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

    .circle-picker[style] {
      width: 33% !important;
      white-space: nowrap !important;
      flex-wrap: nowrap !important;
      justify-content: center !important;
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
