import { BaphoTheme } from '@/theme'
import { darken, lighten, rgba } from 'polished'
import styled, { css } from 'styled-components'

import { ButtonProps } from '..'

export default styled<any>('span')`
  ${({ zIndex = 1, variant, theme }: ButtonProps & BaphoTheme) => css`
    --colour: ${theme.colours.base};

    ${/cta/i.test(variant) &&
      css`
        --bg: ${theme.inputs.button};
        --shadow: 1px 1px 20px -2px ${rgba(theme.colours.secondary, 0)};
        --border: none;
      `};

    ${/basic/i.test(variant) &&
      css`
        --bg: transparent;
        --shadow: none;
        --border: 1px solid ${theme.colours.label};
      `};

    cursor: pointer;
    z-index: ${zIndex};
    display: inline-block;
    position: relative;

    * {
      cursor: pointer;
    }

    button[type]:not([disabled]) {
      position: static;
      color: var(--colour) !important;
      border: var(--border) !important;
      box-shadow: var(--shadow) !important;
      transition: ${theme.eases.button};
      background: var(--bg) !important;

      svg,
      em {
        z-index: 3;
        position: relative;
        font-style: normal;
        font: inherit;
        line-height: 0;
      }

      &:focus,
      &:hover,
      &:active {
        ${/cta/i.test(variant) &&
          css`
            --shadow: 1px 1px 20px -2px ${rgba(lighten(0.2, theme.colours.secondary), 0.7)};
          `};
      }

      &:hover {
        ${/basic/i.test(variant) &&
          css`
            --shadow: none;
            --border: 1px solid ${theme.colours.focus};
            --bg: ${theme.colours.focus};

            &:active {
              --bg: ${darken(0.05, theme.colours.focus)};
            }
          `};
      }

      &:not(:active) svg {
        filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.2));
      }

      &:active {
        --colour: ${rgba(theme.colours.base, 0.9)};

        + span {
          opacity: 1;
          transform: scaleY(-1);
        }
      }

      + span {
        z-index: 2;
        content: '';
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        box-shadow: var(--shadow);
        transition: ${theme.eases.buttonGradient};
        transform: scaleY(-1);
        background: var(--bg);
      }
    }

    &[aria-label^='cta'] {
      --padding: ${/pill/i.test(variant) ? '0.9rem 1rem' : '1rem'};

      button[type]:not([disabled]) {
        height: auto;
        font-size: 0.9rem;
        line-height: 0;
        padding: var(--padding) !important;

        em {
          transform: translate(0, -0.05em);
        }
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
        transform: translate(0, -0.12em);
      }

      + span {
        transform: initial;
      }

      &:active + span {
        transform: rotate(-90deg);
      }
    }
  `}
`
