import 'react-virtualized/styles.css'

import Panel from '@/components/panel'
import styled from 'styled-components'

export default styled.div`
  contain: style paint;
  position: relative;
  height: auto;
  overflow: hidden;
  will-change: transform, width, height;

  > div {
    display: grid;
    grid-template-columns: 150px repeat(40, 1fr);
    grid-template-rows: min-content 1fr 200px;
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

  aside {
    z-index: 5;
    grid-row: 2;
    grid-column: 1;
  }

  section {
    grid-row: 2;
    grid-column: 2 / -1;

    > div[style] {
      width: 100% !important;
      height: 100%;

      [style*='width'] {
        width: 100% !important;
      }
    }

    &:last-child {
      grid-row: 2 / 4;
    }
  }

  footer {
    grid-row: 3;
    grid-column: 2 / -1;
    display: inline-flex;
    align-items: flex-start;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
` as any
