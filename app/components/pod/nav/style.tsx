import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled.aside`
  ${({ theme }) => css`
    padding: 3px var(--pad);

    strong {
      visibility: hidden;
      display: block;
      text-transform: uppercase;
      margin: 0 0 calc(var(--pad) * 1.8);
    }

    a[href] {
      display: block;
      vertical-align: top;
      text-decoration: none !important;
      padding: 0 var(--pad);
      border-radius: 2px;

      &.active,
      &.active:hover {
        color: ${theme.colours.bg};
        background: ${rgba(theme.colours.secondary, 0.66)};
      }

      &:not(.active):hover {
        color: ${theme.colours.base};
        background: ${rgba(theme.colours.secondary, 0.0825)};
      }

      &:last-of-type + * {
        margin-top: 1em;
      }
    }
  `};
`
