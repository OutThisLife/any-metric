import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Box)`
  ${({ theme }: BaphoTheme) => css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: 1025px) and (min-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(max-content, 50px));
      justify-content: center;
    }

    > form {
      grid-column: 1 / -1;
      margin: 0 0 calc(var(--pad) / 2);
    }

    > a[href] {
      cursor: pointer;
      display: grid;
      grid-template-columns: minmax(max-content, 30px) 1fr;
      grid-column-gap: 0.7rem;
      align-items: center;
      position: relative;
      padding: calc(var(--pad) / 2);
      outline: 1px solid transparent;
      outline-offset: -0.2em;
      justify-content: space-between;
      transition: ${theme.eases.base};

      @media (max-width: 1025px) and (min-width: 768px) {
        grid-template-columns: auto 1fr;
        justify-content: center;
      }

      &:hover:not([data-checked]) {
        color: ${theme.colours.base};
        outline-color: ${rgba(theme.colours.secondary, 0.25)};
        transition: none;
      }

      &[data-checked] {
        color: ${theme.colours.base};
      }

      span,
      label {
        font-size: 0.85rem;
      }

      label {
        display: inline-block;
        line-height: 1;
        padding: 2px 4px;
        text-align: center;
        border: 1px solid transparent;
        border-radius: var(--radius);
      }

      .delete {
        z-index: 2;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 0 calc(var(--pad) / 2);

        svg {
          fill: ${theme.colours.base} !important;
        }
      }

      &:not(:hover) .delete,
      &[data-checked] .delete {
        display: none;
      }
    }
  `}
`
