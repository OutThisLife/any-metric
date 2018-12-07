import { BaphoTheme } from '@/theme'
import { darken, lighten, rgba, triangle } from 'polished'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

import { DropdownProps } from '.'

export const reverse = (dir: DropdownProps['direction']) => {
  if (dir === 'top') {
    return 'bottom'
  } else if (dir === 'right') {
    return 'left'
  } else if (dir === 'bottom') {
    return 'top'
  }

  return 'right'
}

export default styled<any>(Box)`
  ${({ direction: dir, theme }: BaphoTheme & Partial<DropdownProps>) => css`
    z-index: 100;
    display: inline-block;
    position: absolute;
    width: auto;
    white-space: nowrap;

    ${dir === 'top' &&
      css`
        left: 50%;
        bottom: 100%;
        padding-bottom: 1em;
        transform: translate(-50%, 0);
      `};

    ${dir === 'right' &&
      css`
        top: 0;
        left: 100%;
        padding-left: 1em;
      `};

    ${dir === 'bottom' &&
      css`
        top: 100%;
        left: 50%;
        padding-top: 1em;
        transform: translate(-50%, 0);
      `};

    ${dir === 'left' &&
      css`
        top: 0;
        right: 100%;
        padding-right: 1em;
      `};

    > div {
      padding: 1px;
      border-radius: var(--radius);
      box-shadow: 0 3px 5px 0 ${rgba(theme.colours.panel, 0.5)};
      background: ${theme.colours.secondary};

      &:before {
        content: '';
        position: absolute;

        ${triangle({
          pointingDirection: reverse(dir),
          width: 8,
          height: 8,
          foregroundColor: theme.colours.secondary
        })}
      }
    }

    ul,
    li {
      display: block;
      margin: 0;
      padding: 0;
      text-align: left;
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
