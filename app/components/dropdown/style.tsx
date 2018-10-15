import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled.div`
  ${({ theme }) => css`
  display: inline-block;
  position: relative;

  nav {
    z-index: 100;
    position: absolute;
    top: 100%;
    left: 0;
    white-space: nowrap;
    padding: calc(var(--pad) / 2) 0;
    border: 1px solid ${rgba(theme.colours.base, 0.2)};
    border-radius: 2px 2px 4px 4px;
    box-shadow: 0 2px 4px ${rgba(theme.colours.base, 0.2)};
    background: ${theme.colours.bg};

    a[href] {
      display: block;
      font-weight: 400;
      text-decoration: none !important;
      padding: 0 var(--pad);

      &:hover {
        color: ${theme.colours.base};
        background: ${rgba(theme.colours.base, 0.05)};
      }
    }
  `}
  }
`
