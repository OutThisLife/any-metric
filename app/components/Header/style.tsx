import { BaphoTheme } from '@/theme'
import { Flex } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Flex)`
  ${({ theme }: BaphoTheme) => css`
    grid-area: head;
    display: grid;
    grid-template-columns: var(--mainGrid);
    grid-column-gap: var(--pad);
    align-items: center;
    position: relative;
    padding: var(--pad) 0;

    > h1 {
      color: ${theme.colours.base};
      font-size: initial;
      text-transform: uppercase;
    }
  `}
`
