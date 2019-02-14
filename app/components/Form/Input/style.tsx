import { BaphoTheme } from '@/theme'
import { rgba, tint } from 'polished'
import { Box } from 'rebass'
import { compose, defaultProps } from 'recompose'
import styled, { css } from 'styled-components'

import { InputProps } from '.'

export default styled<any>('div')`
  ${({ theme }: BaphoTheme) => css`
    --colour: ${rgba(theme.colours.muted, 0.7)};

    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--radius);

    &:focus-within,
    &.focused {
      --colour: ${theme.colours.focus};

      input {
        box-shadow: 0 0 7px 4px ${rgba(theme.colours.secondary, 0.1)},
          inset 0 0 0 1px ${theme.colours.secondary};
      }
    }

    input,
    textarea,
    select {
      z-index: 1;
      cursor: text;
      display: block;
      width: 100%;
      position: relative;
      color: var(--colour);
      font-weight: 300;
      font-size: 1rem;
      padding: 1rem var(--pad);
      border: 0;
      border-radius: var(--radius);
      box-shadow: inset 0 0 0 1px ${tint(0.05, theme.colours.panel)};
      transition: ${theme.eases.base};
      background: ${theme.colours.panel};

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
