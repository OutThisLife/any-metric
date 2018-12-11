import { BaphoTheme } from '@/theme'
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
      margin: calc(var(--pad) / 2) 0;

      &:first-child {
        margin-top: 0;
      }
    }

    > li a[href] {
      cursor: pointer;
      display: grid;
      grid-template-columns: 25px calc(100% - 25px);
      grid-column-gap: 0.5em;
      align-items: center;
      justify-content: space-between;
      position: relative;
      padding: calc(var(--pad) / 4) calc(var(--pad) / 2);
      outline: 1px solid transparent;
      outline-offset: -2px;
      transition: ${theme.eases.base};
      transition-delay: ${theme.eases.delay};

      @media (max-width: 1025px) and (min-width: 768px) {
        grid-template-columns: auto 1fr;
        justify-content: center;
      }

      > label {
        display: inline-block;
        line-height: 1;
        padding: 2px 4px;
        font-size: 0.85rem;
        text-transform: capitalize;
        text-align: center;
        border: 1px solid transparent;
        border-radius: var(--radius);
      }

      > span {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;

        > span {
          font-size: 0.85rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        i {
          display: block;
          align-self: stretch;
          padding: 0 0.5em;

          &:not(:hover) {
            opacity: 0.25;
          }

          svg {
            max-width: none;
            fill: ${theme.colours.base} !important;
          }
        }
      }

      &:not(:hover) > span i {
        visibility: hidden;
      }
    }
  `}
`
