import { BaphoTheme } from '@/theme'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }: BaphoTheme) => css`
    a[href][class*='menu-'] {
      color: ${theme.colours.muted};

      &.menu-true {
        color: ${theme.colours.secondary};
      }

      tr:not(:hover) &.menu-false {
        opacity: 0.25;
      }
    }
  `}
`
