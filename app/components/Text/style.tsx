import { Text } from 'evergreen-ui'
import styled, { css } from 'styled-components'

export default styled<any>(Text)`
  ${({ theme, backgroundImage }: any) =>
    backgroundImage &&
    css`
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      &[href]:hover {
        background-image: ${theme.colours.textHover};
      }
    `}
`
