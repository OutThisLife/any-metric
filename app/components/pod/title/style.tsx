import { darken } from 'polished'
import styled, { css } from 'styled-components'

export default styled.header`
  ${({ theme }) => css`
    cursor: move;
    position: relative;

    .drag-h {
      z-index: 1;
      position: absolute;
      top: 0;
      right: 0;
      bottom :0;
      left: 0;

      ~ div {
        pointer-events: none;

        a[href],
        button,
        input {
          pointer-events: auto;
        }
      }
    }

    .react-grid-item:not(:hover) &:before {
      content: '';
      z-index: 1;
      position: absolute;
      top: calc(var(--pad) * -1.5);
      right: calc(var(--pad) * -1.5);
      bottom: 0;
      left: calc(var(--pad) * -1.5);
      background: ${theme.colours.panel};
    }

    > div {
      z-index: 2;
      display: flex;
      align-items: center;
      position: relative;
      color: ${darken(0.15, theme.colours.panel)};
      border-radius: inherit;

      a[href] {
        color: inherit;
      }
    }

    div:not(:hover) & small span {
      visibility: hidden;
    }

    h2 {
      color: ${theme.colours.base};
      margin: 0;

      a[href] {
        text-decoration: none;

        &:hover {
          color: ${theme.colours.base};
        }
      }
    }

    nav {
      display: inherit;
      align-items: inherit;
      margin-left: auto;

      figure {
        display: inherit;
        align-items: inherit;
        margin: 0 var(--pad);

        a + a {
          margin-left: calc(var(--pad) / 3);
        }

        svg {
          fill: currentColor;
          width: 16px;
          height: auto;
        }
      }
    }
  `};
` as any
