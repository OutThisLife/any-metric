import { BaphoTheme } from '@/theme'
import { darken } from 'polished'
import styled, { css } from 'styled-components'

export default styled<any>('div')`
  ${({ theme }: BaphoTheme) => css`
    user-select: none;
    z-index: 9999;
    position: fixed;
    outline: 1px solid transparent;
    outline-offset: -2px;
    transition: ${theme.eases.base};

    aside {
      width: 600px;
      overflow: hidden;
      border: 1px solid transparent;
      transition: ${theme.eases.base};
      transition-property: border-color, width, height;

      > div {
        padding: 0;
        background: ${darken(0.33, theme.colours.module)};
      }

      h5 svg {
        width: 1.5rem;
      }
    }

    &[data-open='false'] {
      top: calc(50% - 46px) !important;
      left: 0 !important;

      &.flash {
        background-color: ${theme.colours.secondary};
      }

      aside {
        width: 46px;
        height: 46px;

        section {
          opacity: 0;
          transform: scale(0.25);
        }
      }
    }

    &[data-open='true'] aside {
      box-shadow: -8px -8px 50px 0 ${darken(0.03, theme.colours.panel)};
    }

    &:hover aside {
      border-color: ${theme.colours.focus};
    }

    section {
      display: grid;
      grid-template-columns: min-content 25px 1fr max-content max-content;
      align-items: center;
      grid-gap: 1em;
      max-height: 300px;
      overflow: auto;
      transition: ${theme.eases.base};
      transform-origin: left top;

      article > * {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  `}
`
