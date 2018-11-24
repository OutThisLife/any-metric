import styled, { css } from 'styled-components'

import Box from '../Box'

export default styled<any>(Box)`
  ${({ theme }) => css`
    contain: layout;
    background: ${theme.colours.bg};

    h1 {
      font-weight: 700 !important;
      font-size: 1.3rem;
      font-family: ${theme.fonts.family.title};
      line-height: 1;
      text-align: center;
      margin: 0;
    }
  `};
`
