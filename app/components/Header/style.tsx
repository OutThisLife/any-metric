import { BaphoTheme } from '@/theme'
import { invert } from 'polished'
import { Flex } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Flex)`
  ${({ theme }: BaphoTheme) => css`
    grid-area: head;
    position: relative;
    align-items: center;
    padding: 0 var(--offset);
    height: var(--offset);

    > h1 {
      color: ${theme.colours.base};
      font-size: initial;
      text-transform: uppercase;
    }

    > form {
      align-self: stretch;
      height: 100%;
      margin: auto;

      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 100%;
        padding: 0;
        margin: 0;
      }

      input {
        z-index: 1;
        display: block;
        width: 60vh;
        height: 50%;

        &::selection {
          background: ${invert(theme.colours.focus)};
        }
      }
    }
  `}
`
