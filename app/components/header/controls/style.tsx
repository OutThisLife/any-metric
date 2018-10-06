import { darken } from 'polished'
import styled, { css } from 'styled-components'

export default styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    a {
      color: ${darken(0.15, theme.colours.panel)};
      font-size: 1.7rem;
      line-height: 0;

      + a[href] {
        margin-left: calc(var(--pad) / 4);
      }
    }
  `};
`
