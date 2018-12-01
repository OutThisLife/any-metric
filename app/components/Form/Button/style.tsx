import { BaphoTheme } from '@/theme'
import { darken, rgba } from 'polished'
import styled, { css } from 'styled-components'

import { ButtonProps } from '..'

export default styled<any>('span')`
  display: inline-block;

  ${({ variant, theme }: ButtonProps & BaphoTheme) => css`
    --colour: ${theme.colours.base};

    ${/cta/i.test(variant) &&
      css`
        --bg: ${theme.inputs.button};
        --shadow: none;
      `};

    ${/basic/i.test(variant) &&
      css`
        --colour: ${theme.inputs.button};
        --bg: ${theme.inputs.button};
        --shadow: inset 0 0 0 var(--bg), 0 0 1px 1px var(--bg);
        --padding: 14px 15px;
      `};

    button[type]:not([disabled]) {
      position: static;
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
      background-image: none !important;
      background: var(--bg);

      &:hover {
        ${/basic/i.test(variant) &&
          css`
            --colour: ${theme.colours.base};
            --bg: ${theme.inputs.button};
            box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0);

            &:active {
              --bg: ${darken(0.05, theme.inputs.button)};
            }
          `};
      }

      &:active {
        --colour: ${rgba(theme.colours.base, 0.5)};
      }

      svg {
        fill: var(--colour) !important;
      }
    }

    &[aria-label^='cta'] button[type]:not([disabled]) {
      height: auto;
      font-weight: 400;
      font-size: 0.9rem;
      letter-spacing: 0.04em;
      line-height: 0;

      &:not(:hover) {
        background: transparent;
      }

      span {
        transform: translate(0, -0.1em);
      }
    }

    &[aria-label^='icon'] button[type]:not([disabled]) {
      width: 2.5rem;
      height: 2.5rem;

      svg {
        width: 1rem;
        height: auto;
        max-width: none;
        margin: auto;
        transition: ${theme.eases.base};
      }
    }
  `}
`
