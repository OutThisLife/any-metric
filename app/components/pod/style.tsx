import 'react-virtualized/styles.css'

import Panel from '@/components/panel'
import styled from 'styled-components'

export default styled.div`
  position: relative;
  height: auto;

  > div {
    display: grid;
    grid-template-columns: 150px repeat(40, 1fr);
    grid-template-rows: min-content 1fr;
    height: 100%;
  }
` as any

export const Inner = styled(Panel)`
  opacity: 0;
  transform: scale(0.98) translate(-1px, 0);
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.175);
  transition-property: opacity, transform;
  transform-origin: 33% 0;

  .cssTransforms & {
    opacity: 1;
    transform: none;
  }

  header {
    grid-row: 1;
    grid-column: 1 / -1;
  }

  section {
    grid-row: 2;
    grid-column: 2 / -1;
    overflow: hidden;

    aside {
      z-index: 10;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 80%;
      transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.175);
      transition-property: opacity, transform;
      transform-origin: 100% 100%;
      background: ${({ theme }) => theme.colours.bg};

      &:not(.open) {
        opacity: 0;
        transform: scale(0.9) translate(-1px, -1px);
      }
    }

    > div[style] {
      width: 100% !important;
      height: 100%;

      [style*='width'] {
        width: 100% !important;
      }
    }
  }

  aside {
    z-index: 5;
    grid-row: 2;
    grid-column: 1;
  }
` as any
