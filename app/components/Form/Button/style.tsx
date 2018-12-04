import { BaphoTheme } from '@/theme'
import { darken, lighten, rgba } from 'polished'
import { Button } from 'rebass'
import styled, { css } from 'styled-components'

import { FormButtonProps } from '.'

export default styled<any>(Button)`
  ${({ theme }: FormButtonProps & BaphoTheme) => css`
    --colour: ${theme.inputs.button};
    --bg: ${theme.inputs.button};
    --shadow: inset 0 0 0 var(--bg), 0 0 1px 1px var(--bg);
    --padding: 14px 15px;

    display: inline-block;
    position: relative;
    width: fit-content;
    height: fit-content;
    vertical-align: middle;
    color: var(--colour);
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 0;
    letter-spacing: 0.04em;
    text-transform: lowercase;
    font-variant: small-caps;
    line-height: 0;
    padding: var(--padding, 0px);
    border: 0;
    border-radius: 4px;
    box-shadow: var(--shadow);
    transition: ${theme.eases.base};
    background: var(--bg);

    &:not(:hover) {
      background: transparent;
    }

    &:hover {
      --colour: ${theme.colours.base};
      --bg: ${lighten(0.05, theme.inputs.button)};

      box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0);
    }

    &:active {
      --colour: ${rgba(theme.colours.base, 0.5)};
      --bg: ${darken(0.1, theme.inputs.button)};
    }

    &:focus {
      outline: none;
    }

    span,
    svg {
      display: inline-block;
      font: inherit;
      line-height: 0;
      transform: translate(0, -0.15em);
    }

    svg {
      width: 1rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `}
`
