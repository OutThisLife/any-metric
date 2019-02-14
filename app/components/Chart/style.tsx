import { fadeIn } from '@/pages/_app.styles'
import { BaphoTheme } from '@/theme'
import { ChartCanvas } from 'react-stockcharts'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(ChartCanvas)`
  z-index: 10;
  opacity: 0;
  position: relative;
  animation: ${fadeIn} 0.2s linear forwards;

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

export const ZoomedChart = styled<any>(Box)`
  ${({ theme }: BaphoTheme) => css`
    padding: calc(var(--pad) * 2);
    border: 1px solid ${theme.colours.module};
    transition: ${theme.eases.base};
    background: ${theme.colours.panel};

    &:hover {
      border-color: ${theme.colours.secondary};
    }
  `}
`
