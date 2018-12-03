import { BaphoTheme } from '@/theme'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }: BaphoTheme) => css`
    text-align: center;

    div {
      flex-wrap: wrap;
      margin: 0 auto;

      > span {
        display: block;
        width: 100%;
        color: ${theme.colours.label};
        font-size: 0.9rem;
      }
    }
  `}
`
