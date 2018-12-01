import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled<any>('div')`
  ${({ theme }: BaphoTheme) => css`
    display: inline-block;
    position: relative;

    input {
      z-index: 1;
      cursor: text;
      display: inline-block;
      position: relative;
      color: ${theme.colours.base};
      font-weight: 300;
      font-size: 1rem;
      letter-spacing: 0.01em;
      border: 0;

      &::-webkit-input-placeholder {
        color: ${rgba(theme.colours.muted, 0.7)};
      }

      &:focus {
        outline: none;

        &::-webkit-input-placeholder {
          color: ${rgba(theme.inputs.button, 0.75)};
        }
      }
    }
  `}
`
