import { rgba } from 'polished'
import styled from 'styled-components'

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
