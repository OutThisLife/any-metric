import { animIn, animOut } from '@/pages/_app.styles'
import { BaphoTheme } from '@/theme'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

import { DropdownProps } from '.'

export default styled<any>(Box)`
  ${({ direction: dir, theme }: BaphoTheme & Partial<DropdownProps>) => css`
    z-index: 100;
    animation: ${animIn} 0.15s ${theme.eases.easing} forwards;

    ${dir === 'top' && 'transform-origin: center bottom'};
    ${dir === 'right' && 'transform-origin: left center'};
    ${dir === 'bottom' && 'transform-origin: center top'};
    ${dir === 'left' && 'transform-origin: right center'};

    &.anim-out {
      animation-name: ${animOut};
    }

    > div {
      border: 1px solid: ${theme.colours.border};
      background: ${theme.colours.panel};
    }

    ul,
    li {
      display: block;
      margin: 0;
      padding: 0;
      text-align: left;
    }

    ul {
      padding: 2px;
    }

    li a[href] {
      display: flex;
      align-items: center;
      line-height: 0px;
      padding: calc(var(--pad) / 3) calc(var(--pad) / 2);
      outline: 1px solid transparent;
      outline-offset: -1px;
      transition: ${theme.eases.base};

      svg {
        width: 1rem;
        max-width: none;
        vertical-align: middle;

        + span {
          flex: 1;
          padding-left: 0.5em;
        }
      }
    }
  `}
`
