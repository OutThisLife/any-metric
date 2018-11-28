import Box from '@/components/Box'
import styled, { css } from 'styled-components'

import { FormProps } from '.'

export default styled<any>(Box)`
  ${({ groupFields = false }: FormProps) =>
    groupFields &&
    css`
      input[type] {
        margin-right: -1em;
        padding-right: var(--pad);
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    `}
`
