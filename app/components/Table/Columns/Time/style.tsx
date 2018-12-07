import { BaphoTheme } from '@/theme'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }: BaphoTheme) => css`
    grid-row: 1;

    tbody & span {
      color: ${theme.colours.muted};
      font-weight: 300;
      font-size: 0.85rem;
    }

    @media (max-width: 768px) {
      grid-column-start: 4;
    }
  `}
`
