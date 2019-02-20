import { ChartCanvas } from 'react-stockcharts'
import styled from 'styled-components'

export default styled<any>(ChartCanvas)`
  z-index: 10;
  position: relative;

  .react-stockcharts-tooltip-hover {
    z-index: 1;
    position: relative;

    * {
      font-size: 0.85rem;
    }
  }

  main & .react-stockcharts-crosshair-cursor {
    cursor: zoom-in;
  }
` as any
