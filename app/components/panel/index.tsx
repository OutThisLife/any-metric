import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    min-height: 100%;
    padding: var(--pad);
    border: 1px solid transparent;
    border-radius: 4px 4px 0 0;
    box-shadow: 0 1px 3px 0 ${rgba(theme.colours.base, 0.15)};
    transition: 0.1s ease-in-out;
    background: ${theme.colours.bg};

    .react-grid-item:hover & {
      box-shadow: 0 10px 15px 0 ${rgba(theme.colours.base, 0.1)};
      transform: translate3d(0, -2px, 0);
    }
  `};
`
