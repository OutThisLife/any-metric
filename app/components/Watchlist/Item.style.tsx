import { BaphoTheme } from '@/theme'
import { Flex } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Flex)`
  ${({ theme }: BaphoTheme) => css`
    display: contents;

    * {
      user-select: none;
    }

    figure {
      display: flex;
      align-items: center;
      width: 25px;
      margin: 0;
      padding: 0;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }

    time {
      color: ${theme.colours.label};
    }
  `}
`
