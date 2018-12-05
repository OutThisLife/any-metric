import { BaphoTheme } from '@/theme'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }: BaphoTheme) => css`
    div {
      flex-wrap: wrap;
      margin: 0 auto;
      text-align: center;

      > span {
        display: block;
        width: 100%;
        color: ${theme.colours.label};
      }
    }
  `}
`
