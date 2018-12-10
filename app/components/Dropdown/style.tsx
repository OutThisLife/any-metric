import { animIn, animOut } from '@/pages/_app.styles'
import { BaphoTheme } from '@/theme'
import { darken, lighten, rgba } from 'polished'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

import { DropdownProps } from '.'

export default styled<any>(Box)`
  ${({ direction: dir, theme }: BaphoTheme & Partial<DropdownProps>) => css`
    z-index: 100;
    display: inline-block;
    position: absolute;
    width: auto;
    white-space: nowrap;
    animation: ${animIn} 0.15s ${theme.eases.easing} forwards;

    ${dir === 'top' && 'transform-origin: center bottom'};
    ${dir === 'right' && 'transform-origin: left center'};
    ${dir === 'bottom' && 'transform-origin: center top'};
    ${dir === 'left' && 'transform-origin: right center'};

    &.anim-out {
      animation-name: ${animOut};
    }

    > div {
      padding: 1px;
      border-radius: var(--radius);
      box-shadow: 0 3px 5px 0 ${rgba(theme.colours.panel, 0.5)};
      background: ${theme.colours.secondary};
    }

    ul,
    li {
      display: block;
      margin: 0;
      padding: 0;
      text-align: left;
    }

    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      li:first-child {
        grid-column: 1 / -1;
      }
    }

    li h5 {
      display: block;
      color: ${theme.colours.base};
      padding: calc(var(--pad) / 3) calc(var(--pad) / 2);
    }

    li a {
      display: flex;
      align-items: center;
      padding: calc(var(--pad) / 6) calc(var(--pad) / 2);
      transition: ${theme.eases.base};

      &:not(:hover) {
        color: ${lighten(0.33, theme.colours.secondary)};
      }

      &:hover {
        color: ${theme.colours.base};
        transition: none;
        background: ${darken(0.1, theme.colours.secondary)};

        &:active {
          background: ${darken(0.25, theme.colours.secondary)};
        }
      }

      svg {
        flex: 0.3;
        max-width: none;
        vertical-align: middle;

        + span {
          flex: 2;
          padding-left: 0.3em;
        }
      }
    }

    ul + ul:before {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      margin: 0.5em auto;
      background: ${rgba(theme.colours.base, 0.1)};
    }
  `}
`
