import { BaphoTheme } from '@/theme'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Box)`
  ${({ theme }: BaphoTheme) => css`
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
