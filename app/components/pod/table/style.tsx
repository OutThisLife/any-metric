import 'react-virtualized/styles.css'

import { darken, rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled.section`
  ${({ theme }) => css`
    [tabindex]:focus {
      outline: none;
    }

    .ReactVirtualized__Table__sortableHeaderIcon {
      vertical-align: top;
      transform: translate(2px, 4px);
    }

    [class$='Table__row'] {
      cursor: pointer;
      position: relative;
      box-shadow: inset 0 1px 0 ${theme.colours.panel};

      &:first-of-type {
        box-shadow: none;
      }

      &:hover {
        z-index: 2;
        box-shadow: inset 0 1px 0 ${darken(0.05, theme.colours.panel)},
          inset 0 -1px 0 ${darken(0.05, theme.colours.panel)};
        background: ${rgba(theme.colours.base, 0.03)};

        strong > span {
          color: ${theme.colours.secondary};
          text-decoration: underline;
        }

        .datasrc {
          svg:first-child {
            opacity: 0.1;
            transform: translate(50%, 0);
          }

          svg:last-child {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      }

      figure {
        margin: 0;
      }

      time {
        font-size: 0.9em;
        margin-left: auto;
      }

      p {
        margin: 0;
      }

      &:not(:hover) p {
        opacity: 0.6;
      }

      .datasrc {
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
          fill: ${theme.colours.secondary};
          stroke: none;
          transform: translate(-45%, -50%);
        }
      }

      .copy {
        display: flex;
        align-items: baseline;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        span:first-of-type {
          flex: 1 0 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        span:last-of-type {
          margin-left: 8px;

          label {
            color: ${theme.colours.base};
            font-size: 0.9em;
            padding: 1px 5px;
            background: rgba(255, 212, 90, 1);

            + label {
              margin-left: 2px;
            }
          }
        }
      }

      &:not(:hover) .copy span:last-of-type {
        opacity: 0.5;
      }
    }
  `};
` as any
