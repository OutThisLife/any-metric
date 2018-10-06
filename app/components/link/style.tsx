import styled, { css } from 'styled-components'

export default styled.a`
  ${({ theme }) => css`
    color: ${theme.colours.secondary};
    text-decoration: none;

    i,
    svg {
      vertical-align: middle;
    }

    h1 &,
    h2 &,
    h3 &,
    h4 &,
    h5 & {
      color: inherit;

      &:hover {
        color: ${theme.colours.secondary};
        text-decoration: none;
      }
    }
  `};
`
