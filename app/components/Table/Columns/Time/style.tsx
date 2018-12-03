import { BaphoTheme } from '@/theme'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }: BaphoTheme) => css`
    text-align: right;

    div {
      color: ${theme.colours.muted};
      font-weight: 300;
      font-size: 0.9rem;
    }
  `}
`
