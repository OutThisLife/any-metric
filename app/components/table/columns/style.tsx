import { darken } from 'polished'
import styled, { css } from 'styled-components'

export const Link = styled.a`
  ${({ theme }) => css`
    display: block;
    position: relative;
    text-align: center;

    svg {
      width: 16px;
      margin: auto;
      fill: ${theme.colours.panel};
      stroke-width: 2em;
      stroke: ${darken(0.1, theme.colours.panel)};
      vertical-align: middle;
    }

    svg:last-child {
      opacity: 0;
      position: absolute;
      top: 50%;
      left: calc(50% + 1px);
      fill: ${theme.colours.base};
      stroke: none;
      transform: translate(-45%, -50%);
    }

    [class$='Table__row']:hover & {
      svg:first-child {
        opacity: 0.1;
        transform: translate(50%, 0);
      }

      svg:last-child {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }
  `};
`

export const Title = styled.div`
  h4 {
    > * {
      vertical-align: middle;
    }

    [class$='Table__row']:not(:hover) & > button {
      opacity: 0.6;
    }

    > a {
      text-decoration: none;

      [class$='Table__row']:hover & {
        text-decoration: underline;
      }
    }
  }

  > div {
    display: flex;
    align-items: baseline;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .copy {
      flex: 1 0 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tags {
      margin-left: 8px;

      [class$='Table__row']:not(:hover) & {
        opacity: 0.75;
      }

      strong {
        position: relative;
        display: inlien-flex;
        align-items: center;
        justify-content: space-between;

        a {
          z-index: 1;
          display: block;
          margin-left: 0.5em;
          transition: 0.15s ease-in-out;

          svg {
            transform: translate(0, -1px);
          }
        }

        &:not(:hover) a {
          margin-left: -8px;

          svg {
            opacity: 0;
          }
        }
      }
    }
  }

  [data-tag] {
    cursor: pointer;

    + * {
      margin-left: 3px;
    }
  }
`
