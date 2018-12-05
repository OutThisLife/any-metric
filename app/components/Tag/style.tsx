import { BaphoTheme } from '@/theme'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Box)`
  ${({ theme }: BaphoTheme) => css`
    display: inline-block;
    color: ${theme.colours.muted};
    line-height: 1;

    + label {
      margin-left: 0.2em;

      &:before {
        content: ', ';
      }
    }
  `}
`
