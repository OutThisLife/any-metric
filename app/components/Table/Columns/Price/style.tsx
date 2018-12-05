import { BaphoTheme } from '@/theme'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }: BaphoTheme) => css`
    span {
      display: block;
      width: 100%;
    }

    span span:last-child {
      color: ${theme.colours.muted};
      line-height: 0;
    }
  `}
`
