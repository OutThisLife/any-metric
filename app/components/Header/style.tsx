import { BaphoTheme } from '@/theme'
import { Flex } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Flex)`
  ${({ theme }: BaphoTheme) => css`
    grid-area: head;
    position: relative;
    align-items: center;
    padding: 0 var(--offset);
    height: var(--offset);

    h1 {
      color: ${theme.colours.base};
      font-size: 1.1rem;
      font-family: ${theme.fonts.family.title};
      text-transform: uppercase;
    }

    form {
      align-self: stretch;
      height: 100%;
      margin: auto;

      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 100%;
        padding: 0;
        margin: 0;
      }

      input {
        z-index: 1;
        display: block;
        width: 60vh;
        height: 50%;
      }
    }

    .picker {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: ${theme.eases.base};

      @media (min-width: 768px) {
        position: absolute;
        top: calc(50% - 3px);
        right: 0;
      }

      @media (max-width: 768px) {
        display: none;
      }

      &:not(:hover) {
        opacity: 0.4;
      }

      > a {
        display: inline-block;
        line-height: 0;
        vertical-align: middle;

        + * {
          z-index: 100;
          position: absolute !important;
          top: 100%;
          right: 0;

          > div {
            background: none !important;
          }

          .flexbox-fix {
            display: none !important;
          }
        }
      }
    }
  `}
`
