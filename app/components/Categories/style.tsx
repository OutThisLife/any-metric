import Box from '@/components/Box'
import { BaphoTheme } from '@/theme'
import { darken, rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled<any>(Box)`
  ${({ theme }: BaphoTheme) => css`
    list-style: none;
    margin: 0;
    padding: 0;

    ul,
    li {
      display: block;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    > li {
      display: block;

      a[href] {
        display: block;
        font-weight: 300;
        padding: calc(var(--pad) / 5) var(--pad);
      }

      > a[href] {
        color: ${theme.colours.base};
        text-transform: uppercase;
        padding: calc(var(--pad) / 2);
        padding-bottom: calc(var(--pad) / 4);

        &:hover {
          color: inherit;
        }
      }

      li > a[href] {
        color: ${theme.colours.muted};
        font-size: 0.9em;
        outline: 1px solid transparent;
        outline-offset: -2px;
        transition: none;

        &:not(:hover) {
          transition: ${theme.eases.base};
        }

        &:hover {
          color: ${theme.colours.base};
          background: ${rgba(theme.inputs.bg, 0.5)};
        }
      }

      ul ul a[href] {
        text-indent: 0.7em;
        padding-top: 0.3em;
        padding-bottom: 0.3em;
      }
    }
  `}
`

export const Group = styled<any>(Box)`
  ${({ theme }: BaphoTheme) => css`
    border-radius: 4px;
    border: 1px solid ${rgba(theme.colours.label, 0.2)};
    transition: ${theme.eases.base};
    background: transparent;

    &:first-of-type > a[href] {
      border-radius: 4px 0 0 4px;
    }

    &:last-of-type > a[href] {
      border-radius: 0 0 4px 4px;
    }

    &:hover,
    &.active {
      border-color: ${rgba(theme.colours.label, 0.5)};
      background: ${rgba(darken(0.2, theme.colours.label), 0.4)};
    }

    &.active li.active > a[href] {
      color: ${theme.colours.base};
      outline-color: ${theme.colours.focus};
      background: ${rgba(theme.inputs.bg, 0.5)};
    }
  `}
`
