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

    > li a[href] {
      cursor: pointer;
      display: grid;
      grid-template-columns: minmax(max-content, 30px) 1fr;
      grid-column-gap: 0.7rem;
      align-items: center;
      position: relative;
      padding: 0 calc(var(--pad) / 2);
      outline: 1px solid transparent;
      outline-offset: -0.2em;
      justify-content: space-between;
      transition: ${theme.eases.base};
      transition-delay: ${theme.eases.delay};

      @media (max-width: 1025px) and (min-width: 768px) {
        grid-template-columns: auto 1fr;
        justify-content: center;
      }

      &:hover {
        color: ${theme.colours.base};
        outline-color: ${rgba(theme.colours.secondary, 0.25)};
        transition: none;
      }

      &[data-checked] {
        color: ${theme.colours.base};
        outline-color: ${rgba(theme.colours.secondary, 0.25)};
      }

      > label {
        display: inline-block;
        line-height: 1;
        padding: 2px 4px;
        font-size: 0.85rem;
        text-align: center;
        border: 1px solid transparent;
        border-radius: var(--radius);
      }

      > span {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        padding: calc(var(--pad) / 2) 0;

        > span {
          font-size: 0.85rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        i {
          display: inherit;
          align-items: inherit;
          align-self: stretch;
          padding: 0 2px;

          svg {
            fill: ${theme.colours.base} !important;
          }
        }

        &:not(:hover) i {
          display: none;
        }
      }
    }
  `}
`
