import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { focusStyles } from '@/theme'
import styled from 'styled-components'

export default styled.div`
  width: 100vw;
  min-height: 100%;
  overflow-y: auto;

  .react-grid-item {
    &.react-grid-placeholder {
      ${focusStyles} opacity: 1;
      background: none;
    }

    &.resizing,
    &.react-draggable-dragging {
      opacity: 0.5;

      > * {
        pointer-events: none;
      }
    }

    &.react-draggable-dragging {
      cursor: -webkit-grabbing;
    }
  }

  .react-resizable-handle {
    z-index: 10;
  }
` as any
