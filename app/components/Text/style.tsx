import { Text } from 'evergreen-ui'
import styled, { css } from 'styled-components'

import { TextProps } from '.'

export default styled<any>(Text)`
  ${({ backgroundImage }: TextProps) =>
    backgroundImage &&
    css`
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `}
`
