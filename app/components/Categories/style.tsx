import { BaphoTheme } from '@/theme'
import { lighten, rgba } from 'polished'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Box)`
  ${({ theme }: BaphoTheme) => css`
    display: flex;
    align-items: stretch;
    justify-content: left;
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
      flex-wrap: nowrap;
      white-space: nowrap;
      justify-content: space-between;
      overflow: auto;
      padding-bottom: var(--pad);
    }

    ul,
    li {
      display: block;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    > li {
      display: inline-block;
      position: relative;
      width: auto;
      outline: 1px solid transparent;
      padding: calc(var(--pad) / 2);
      border: 1px solid ${theme.colours.border};
      transition: ${theme.eases.base};
      background: transparent;

      &:hover,
      &[data-checked] {
        z-index: 1;
        outline-color: ${rgba(theme.colours.focus, 0.75)};
      }

      span {
        vertical-align: middle;
      }

      h5 {
        white-space: nowrap;
        text-transform: uppercase;
        padding-bottom: calc(var(--pad) / 4);
      }

      &[data-checked] h5 {
        color: ${theme.colours.focus};
      }

      &:not(:hover):not([data-checked]) {
        filter: grayscale(1) opacity(0.4);
      }

      li {
        display: flex;
        align-items: center;
        position: relative;
        color: ${theme.colours.muted};

        a[href] {
          display: inline-block;
          width: 100%;
          color: currentColor;
          font-size: 0.85rem;
          padding: 0 0 1px 4px;
          transition: none;

          &:not(:hover) {
            transition: ${theme.eases.base};
          }
        }

        &[data-checked] {
          color: ${lighten(0.3, theme.colours.muted)};
        }
      }
    }
  `}
`
