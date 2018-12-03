import { BaphoTheme } from '@/theme'
import styled, { css } from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  ${({ theme }: BaphoTheme) => css`
    line-height: 0;
    text-align: right;
    padding-right: var(--pad);

    div {
      font-size: 0.8rem;
      line-height: 1.2;

      > span {
        display: block;
        width: 100%;

        &:last-child {
          color: ${theme.colours.muted};
        }
      }
    }
  `}
`
