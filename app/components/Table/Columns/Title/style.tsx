import { BaphoTheme } from '@/theme'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Box)`
  ${({ theme }: BaphoTheme) => css`
    padding: 0 !important;
    justify-content: flex-start !important;

    > div {
      width: 100%;
      margin-right: auto;
    }

    .title {
      display: block;
      position: relative;
      width: 100%;
      font-weight: 600;
      white-space: nowrap;
      padding: calc(var(--pad) / 2) var(--pad);

      .favourite {
        width: 1.5rem;
        margin-right: 0.5em;
        transition: inherit;

        &:not(.hl) {
          fill: ${theme.colours.muted};
        }

        &:hover {
          fill: ${theme.colours.price.hl};
        }
      }
    }
  `}
`
