import { BaphoTheme } from '@/theme'
import { darken, lighten, rgba } from 'polished'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Box)`
  ${({ theme }: BaphoTheme) => css`
    z-index: 100;
    display: inline-block;
    position: relative;
    width: auto;

    .dropdown {
      display: inline-block;
      position: absolute;
      width: auto;
      white-space: nowrap;

      > div {
        padding: 1px;
        border-radius: 2px;
        box-shadow: 0 3px 5px 0 ${rgba(theme.colours.panel, 0.5)};
        background: ${theme.colours.secondary};
      }

      ul,
      li {
        display: block;
        margin: 0;
        padding: 0;
      }

      li h5 {
        display: block;
        color: ${theme.colours.base};
        padding: calc(var(--pad) / 3) calc(var(--pad) / 2);
      }

      li a {
        display: block;
        text-align: left;
        padding: calc(var(--pad) / 6) calc(var(--pad) / 2);
        transition: ${theme.eases.base};

        &:not(:hover) {
          color: ${lighten(0.33, theme.colours.secondary)};
        }

        &:hover {
          color: ${theme.colours.base};
          transition: none;
          background: ${darken(0.1, theme.colours.secondary)};

          &:active {
            background: ${darken(0.25, theme.colours.secondary)};
          }
        }
      }

      ul + ul:before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        margin: 0.5em auto;
        background: ${rgba(theme.colours.base, 0.1)};
      }
    }
  `}
`
