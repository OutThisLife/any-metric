import Box from '@/components/Box'
import omit from 'lodash/omit'
import styled, { css } from 'styled-components'

import { FormProps } from '.'

const Item = props => <Box {...omit(props, ['groupFields'])} />

export default styled<any>(Item)`
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
