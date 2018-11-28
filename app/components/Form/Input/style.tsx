import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled<any>('div')`
  ${({ theme }: BaphoTheme) => css`
    display: inline-block;
    position: relative;

    input {
      z-index: 1;
      cursor: text;
      display: inline-block;
      position: relative;
      color: ${theme.colours.base};
      font-weight: 300;
      font-size: 1rem;
      letter-spacing: 0.01em;
      border: 0;
      background: ${theme.inputs.bg};

      &::-webkit-input-placeholder {
        color: ${rgba(theme.colours.muted, 0.7)};
      }

      &:focus {
        outline: none;
      }

      &:not(:focus) {
        background: ${rgba(theme.inputs.bg, 0.8)};

        + div {
          opacity: 0;
        }
      }
    }

    > div {
      z-index: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      width: calc(100% + 4px);
      height: calc(100% + 2px);
      padding: 0 !important;
      transform: translate(-50%, -50%);
      background: ${theme.inputs.text};
    }
  `}
`
