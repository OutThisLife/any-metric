import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled<any>('header')`
  ${({ theme }) => css`
    contain: layout;
    z-index: 10;
    position: relative;
    box-shadow: 0 1px 3px 0 ${rgba(theme.colours.base, 0.15)};
    background: ${theme.colours.bg};

    > div {
      padding: calc(var(--pad) * 0.7) calc(var(--pad) * 2);
    }

    > nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 0 calc(var(--pad) * 2);

      a {
        text-decoration: none !important;

        &.active {
          color: ${theme.colours.secondary};
        }

        &:not(.active) {
          color: ${rgba(theme.colours.base, 0.5)};

          &:hover {
            color: ${rgba(theme.colours.base, 0.55)};
          }
        }
      }

      button + button {
        margin-left: calc(var(--pad) * 1);
      }
    }
  `};
`
