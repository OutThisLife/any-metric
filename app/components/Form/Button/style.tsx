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
    text-transform: lowercase;
    font-variant: small-caps;
    line-height: 0;
    padding: var(--padding, 0px);
    border: 0;
    box-shadow: var(--shadow);
    transition: ${theme.eases.base};
    background: var(--bg);

    &:hover {
      --colour: ${theme.colours.base};
      --bg: ${lighten(0.05, theme.inputs.button)};

      box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0);
    }

    &:active {
      --colour: ${rgba(theme.colours.base, 0.5)};
    }

    &:focus {
      outline: none;
    }

    &[aria-label^='cta'] {
      height: auto;
      font-weight: 400;
      font-size: 0.9rem;
      letter-spacing: 0.04em;
      line-height: 0;
      border-radius: 4px;

      &:not(:hover) {
        background: transparent;
      }

      &:active {
        --bg: ${darken(0.1, theme.inputs.button)};
      }
    }

    &[aria-label^='icon'] {
      --padding: 0;
      --colour: ${theme.colours.base};

      width: 2.5rem;
      height: 2.5rem;
      border-radius: 100em;

      svg {
        width: 1rem;
        height: auto;
        max-width: none;
        margin: auto;
        transition: ${theme.eases.base};
      }
    }

    span,
    svg {
      display: inline-block;
      font: inherit;
      line-height: 0;
      transform: translate(0, -0.15em);
    }
  `}
`
