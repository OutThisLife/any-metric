import styled from 'styled-components'

import { ChartCanvas } from 'react-stockcharts'

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
` as any
