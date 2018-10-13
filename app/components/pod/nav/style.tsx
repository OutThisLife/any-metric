import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled.aside`
  ${({ theme }) => css`
    padding: var(--pad);

    a[href] {
      display: block;
      vertical-align: top;
      text-decoration: none !important;
      padding: 0 var(--pad);
      border-radius: 4px;

      &.active,
      &.active:hover {
        color: ${theme.colours.bg};
        background: ${rgba(theme.colours.secondary, 0.66)};
      }

      &:not(.active):hover {
        color: ${theme.colours.base};
        background: ${rgba(theme.colours.secondary, 0.0825)};
      }
    }

    button {
      margin-top: 1em;
    }
  `};
`
