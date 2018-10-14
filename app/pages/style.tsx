import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { focusStyles } from '@/theme'
import styled from 'styled-components'

export default styled.div`
  .react-grid-item {
    transition: none;

    &.react-grid-placeholder {
      ${focusStyles};
      opacity: 1;
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
  }
` as any
