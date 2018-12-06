import { BaphoTheme } from '@/theme'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }: BaphoTheme) => css`
    tbody & > span {
      color: ${theme.colours.muted};
      font-weight: 300;
    }
  `}
`
