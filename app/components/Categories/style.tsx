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
      cursor: pointer;
      display: inline-block;
      position: relative;
      width: auto;
      padding: calc(var(--pad) / 2);
      border: 1px solid ${theme.colours.border};
      outline: 1px solid transparent;
      outline-offset: -0.2em;
      background: transparent;

      &:not(:hover) {
        transition: ${theme.eases.base};

        li,
        h5 {
          transition: ${theme.eases.base};
        }
      }

      &:hover {
        outline-color: ${rgba(theme.colours.secondary, 0.25)};
      }

      &[data-checked] {
        outline-color: ${theme.colours.secondary};
      }

      &:not(:hover):not([data-checked]) {
        filter: grayscale(1) opacity(0.4);
      }

      span {
        vertical-align: middle;
      }

      h5 {
        display: inline-flex;
        align-items: center;
        color: ${lighten(0.33, theme.colours.secondary)};
        white-space: nowrap;
        padding-bottom: calc(var(--pad) / 4);

        span {
          opacity: 0.5;
          font-size: 0.9em;
        }
      }

      &:not([data-checked]) h5 {
        opacity: 0.8;
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
