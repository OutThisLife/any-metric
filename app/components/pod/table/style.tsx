import 'react-virtualized/styles.css'

import { darken, rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled.section`
  ${({ theme }) => css`
    [tabindex]:focus {
      outline: none;
    }

    [class$='Table__headerRow'] {
      user-select: none;

      [aria-sort] {
        color: ${theme.colours.secondary};
      }

      [class*='sortableHeaderIcon'] {
        vertical-align: top;
        position: absolute;
        fill: ${theme.colours.base} !important;
        transform: translate(2px, 5px);
      }
    }

    [class$='Table__row'] {
      box-shadow: inset 0 1px 0 ${theme.colours.panel};

      &:first-of-type {
        box-shadow: none;
      }

      &:hover {
        z-index: 2;
        box-shadow: inset 0 1px 0 ${darken(0.05, theme.colours.panel)},
          inset 0 -1px 0 ${darken(0.05, theme.colours.panel)};
        background: ${rgba(theme.colours.base, 0.03)};
      }
    }

    [class$='innerScrollContainer'] {
      overflow: visible !important;

      [style*='overflow'] {
        overflow: visible !important;
      }
    }
  `};
` as any
