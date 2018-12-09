import { BaphoTheme } from '@/theme'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }: BaphoTheme) => css`
    position: relative;

    label {
      font-size: 0.85rem;
    }

    a[href][class*='menu-'] {
      color: ${theme.colours.label};

      &.menu-true {
        color: ${theme.colours.secondary};
      }
    }
  `}
`
