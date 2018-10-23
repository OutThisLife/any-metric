import '../static/styles.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled.div`
  .react-grid-item {
    transition: none;

    &.react-grid-placeholder {
      z-index: 1;
      opacity: 1;
      border: 3px solid ${({ theme }) => rgba(theme.colours.secondary, 0.2)};
      transition: none;
      background: none;
    }

    &.resizing,
    &.react-draggable-dragging {
      transition: none !important;

      * {
        pointer-events: none !important;
        transition: none !important;
      }
    }

    &.react-draggable-dragging {
      cursor: -webkit-grabbing;
    }
  }

  .react-resizable-handle {
    z-index: 10;
    right: -11px;
    bottom: -11px;
  }

  .drag-h {
    cursor: move;
  }
` as any

export const Main = styled.main`
  --pad: calc(8px + (16 - 9) * (100vw - 400px) / 1700);

  display: grid;
  grid-template-areas:
    'head head head'
    'body body body'
    'body body body';
  grid-template-rows: min-content 1fr;
  grid-template-columns: 1fr;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;

  ${({ theme }) => css`
    background: ${theme.colours.panel};

    > header {
      grid-area: head;
      display: grid;
      grid-template-columns: minmax(auto, 200px) 1fr;
      grid-template-areas: 'logo nav nav';
      align-items: center;

      > div {
        grid-area: logo;
      }

      > nav {
        grid-area: nav;
      }
    }

    > section {
      align-self: stretch;
      grid-area: body;
      position: relative;
      overflow: auto;
      background: ${theme.colours.panel};
    }

    a[href]:hover {
      color: ${theme.colours.secondary};
    }
  `};
`
