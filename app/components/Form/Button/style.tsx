import { BaphoTheme } from '@/theme'
import { darken, lighten, rgba } from 'polished'
import { Button } from 'rebass'
import styled, { css } from 'styled-components'

import { FormButtonProps } from '.'

export default styled<any>(Button)`
  ${({ theme }: FormButtonProps & BaphoTheme) => css`
    --colour: ${theme.colours.secondary};
    --bg: ${theme.colours.panel};
    --padding: 14px 15px;

    cursor: pointer;
    display: inline-block;
    position: relative;
    width: fit-content;
    height: fit-content;
    vertical-align: middle;
    color: var(--colour);
    font-weight: 400;
    font-size: initial;
    line-height: 0;
    text-transform: lowercase;
    font-variant: small-caps;
    line-height: 0;
    padding: var(--padding, 0px);
    border: 0;
    box-shadow: inset 0 0 0 0 ${theme.colours.border};
    background: var(--bg);

    &:hover {
      --colour: ${theme.colours.base};
      --bg: ${lighten(0.05, theme.colours.focus)};
    }

    &:active {
      --colour: ${rgba(theme.colours.base, 0.5)};
      --bg: ${darken(0.1, theme.colours.focus)};
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
      fill: var(--colour) !important;
      transform: translate(-50%, -50%);
    }

    + button {
      margin-left: 1em;
    }
  `}
`
