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
      margin: calc(var(--pad) / 2) 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
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

      &:hover {
        transition: none;
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
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;

        > span {
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

    time {
      display: flex;
      align-items: center;
      justify-self: flex-end;
      color: ${theme.colours.muted};

      > * + * {
        margin-left: 0.5em;
      }

      i {
        display: block;
        width: 5px;
        height: 5px;
        border-radius: 5px;
        background: currentColor;
      }

      small {
        cursor: pointer;
        flex: 1;
        color: ${theme.colours.label};
        font-size: 0.85rem;
        line-height: 1;
        border-bottom: 1px dotted ${rgba(theme.colours.label, 0.69)};

        &:not(:hover) {
          transition: ${theme.eases.base};
        }

        &:hover {
          color: ${theme.colours.muted};
        }
      }
    }
  `}
`
