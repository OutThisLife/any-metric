import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled.div`
  ${({ theme }) => css`
    position: relative;
    padding: var(--pad);

    .drag-h {
      z-index: 2;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      svg {
        opacity: 0.25;
        position: absolute;
        top: -0.5em;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }

    > div {
      display: flex;
      align-items: center;
      color: ${rgba(theme.colours.base, 0.5)};
      border-radius: inherit;

      > * {
        position: relative;
        z-index: 3;
      }

      h2 {
        display: inline-flex;
        align-items: center;
      }

      a[href] {
        color: inherit;
      }
    }

    nav {
      display: inherit;
      align-items: inherit;
      margin-left: auto;
    }
  `};
` as any
