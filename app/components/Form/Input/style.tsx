import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import { Box } from 'rebass'
import { compose, defaultProps } from 'recompose'
import styled, { css } from 'styled-components'

import { InputProps } from '.'

export default styled<any>('div')`
  ${({ theme }: BaphoTheme) => css`
    display: inline-block;
    position: relative;
    padding: calc(var(--pad) / 3.2) var(--pad);
    border-radius: 4px;

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

export const Input = compose<InputProps, InputProps>(
  defaultProps({
    as: 'input',
    type: 'text',
    autoComplete: 'off'
  })
)(Box)
