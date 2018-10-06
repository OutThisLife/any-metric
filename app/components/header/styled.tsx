import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled.header`
  ${({ theme }) => css`
    z-index: 500;
    position: relative;
    box-shadow: 0 1px 3px 0 ${rgba(theme.colours.base, 0.15)};

    > div {
      padding: var(--pad) calc(var(--pad) * 2);
    }

    nav {
      display: flex;
      align-items: center;
      padding: var(--pad) calc(var(--pad) * 2);

      > div:first-of-type {
        transform: translate(0, var(--pad));
      }

      > div:last-of-type {
        margin-left: auto;
      }
    }

    nav > div:first-of-type a {
      display: inline-block;
      text-decoration: none;
      padding: 0.5em 0;
      box-shadow: inset 0 -2px currentColor;

      &:hover {
        text-decoration: none;
      }

      &.active {
        color: ${theme.colours.secondary};

        sup {
          display: none;
        }
      }

      &:not(.active) {
        color: ${rgba(theme.colours.base, 0.5)};

        &:hover {
          color: ${rgba(theme.colours.base, 0.55)};
        }

        &:not(:hover) {
          box-shadow: none;
        }
      }

      + a {
        margin-left: 1.5em;
      }
    }
  `};
`
