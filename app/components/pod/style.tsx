import 'react-virtualized/styles.css'

import Panel from '@/components/panel'
import { darken, rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled(Panel)`
  ${({ theme }) => css`
    padding-bottom: 70px;

    [tabindex]:focus {
      outline: none;
    }

    [class*='panel-'] {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr max-content;
      padding: 0;
    }

    [class*='headerColumn'] {
      user-select: none;
      color: ${rgba(theme.colours.base, 0.4)};

      * {
        vertical-align: middle;
      }

      svg {
        fill: currentColor;
        stroke: none;
      }

      [title] {
        font-size: 0.9em;
        letter-spacing: 0.04em;
      }
    }

    [class$='Table__row'] {
      cursor: pointer;
      position: relative;
      box-shadow: inset 0 1px 0 ${theme.colours.panel};

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

      strong {
        display: flex;
        font-weight: 700;

        time {
          font-weight: 400;
          margin-left: auto;
        }
      }

      &:not(:hover) strong time {
        opacity: 0.5;
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
    }
  `};
`