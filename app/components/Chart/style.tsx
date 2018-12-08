import { ChartCanvas } from 'react-stockcharts'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

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

export const ZoomedChart = styled<any>(Box)`
  ${({ theme }) => css`
    padding: calc(var(--pad) * 2);
    border: 1px solid ${theme.colours.module};
    background: ${theme.colours.panel};
  `}
`
