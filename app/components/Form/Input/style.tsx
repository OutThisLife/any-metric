import { BaphoTheme } from '@/theme'
import { darken, rgba } from 'polished'
import { Box } from 'rebass'
import { compose, defaultProps } from 'recompose'
import styled, { css } from 'styled-components'

import { InputProps } from '.'

export default styled<any>('div')`
  ${({ theme }: BaphoTheme) => css`
    --bg: ${rgba(theme.colours.panel, 0.5)};
    --colour: ${rgba(theme.colours.muted, 0.7)};

    display: inline-block;
    position: relative;
    padding: calc(var(--pad) / 3.2) var(--pad);
    border-radius: 4px;

    &:focus-within {
      --bg: ${theme.colours.panel};
      --colour: ${theme.colours.focus};

      input {
        box-shadow: 0 0 7px 4px
            ${darken(0.2, rgba(theme.colours.secondary, 0.35))},
          inset 0 0 0 1px ${theme.colours.secondary};
      }
    }

    input,
    textarea,
    select {
      z-index: 1;
      cursor: text;
      display: inline-block;
      position: relative;
      color: var(--colour);
      font-weight: 300;
      font-size: 1rem;
      letter-spacing: 0.01em;
      padding: 0 var(--pad);
      border: 0;
      border-radius: 4px;
      box-shadow: 0 0 0 0px ${theme.colours.panel},
        inset 0 0 0 1px ${theme.colours.panel};
      transition: ${theme.eases.base};
      background: var(--bg);

      &::-webkit-input-placeholder {
        color: var(--colour);
        transition: inherit;
      }

      &:not(:only-child) {
        padding-left: 2.5em;
      }
    }

    textarea {
      padding: var(--pad);
    }

    svg {
      z-index: 1;
      pointer-events: none;
      position: absolute;
      top: 50%;
      left: 1em;
      width: 1em;
      fill: var(--colour) !important;
      stroke: var(--colour) !important;
      transition: ${theme.eases.base};
      transform: translate(0, -50%);
    }
  `}
`

export const Input = compose<InputProps, InputProps>(
  defaultProps({
    as: 'input',
    type: 'text',
    autoCorrect: 'off',
    spellCheck: 'false',
    autoComplete: 'off'
  })
)(Box)
