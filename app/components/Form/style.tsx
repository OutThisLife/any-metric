import Box from '@/components/Box'
import styled, { css } from 'styled-components'

import { FormProps } from '.'

export default styled<any>(Box)`
  margin: 0;
  padding: 0;

  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
  }

  ${({ groupFields = false }: FormProps) =>
    groupFields &&
    css`
      fieldset > div:first-of-type:not(:only-child) {
        transform: translate(10px, -3px);

        input[type] {
          padding-right: calc(var(--pad));
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    `}
`
