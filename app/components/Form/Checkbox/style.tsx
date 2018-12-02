import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled<any>('div')`
  ${({ theme }: BaphoTheme) => css`
    --size: 10px;

    display: inline-block;
    position: relative;
    width: var(--size);
    height: var(--size);
    background: ${theme.inputs.bg};

    input[type='checkbox'] {
      z-index: 1;
      cursor: pointer;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      border: 0;

      &:not(:checked) + div:before {
        opacity: 1;
      }

      &:checked + div:after {
        opacity: 1;
      }
    }

    > div {
      &:before,
      &:after {
        opacity: 0;
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: ${theme.eases.base};
      }

      &:before {
        border: 1px solid;
        border-image: linear-gradient(
            ${theme.inputs.border},
            ${rgba(theme.inputs.border, 0.5)}
          )
          1;
      }
      &:after {
        background: ${theme.inputs.border};
      }
    }
  `}
`
