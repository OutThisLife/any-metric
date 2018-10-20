import { darken, rgba } from 'polished'
import styled, { css } from 'styled-components'

export const Date = styled.time`
  font-size: 0.9em;
  margin-left: auto;
`

export const Image = styled.figure`
  margin: 0;
`

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
      fill: ${theme.colours.secondary};
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
  ${({ theme }) => css`
    h4 {
      font-size: 1rem;
      font-family: ${theme.fonts.family.copy};

      > * {
        vertical-align: middle;
      }

      > div {
        margin-right: 0.5em;

        [class$='Table__row']:not(:hover) & > a:only-child {
          opacity: 0.4;
        }
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

      span:first-of-type {
        flex: 1 0 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      span:last-of-type {
        margin-left: 8px;

        [class$='Table__row']:not(:hover) & {
          opacity: 0.75;
        }
      }
    }

    label {
      cursor: pointer;
      color: ${theme.colours.base};
      font-size: 0.9em;
      padding: 1px 5px;
      border: 1px solid ${theme.colours.label};
      border-radius: 2px;
      background: ${theme.colours.label};

      [class$='Table__row']:not(:hover) & {
        color: ${rgba(theme.colours.base, 0.7)};
        background: ${rgba(theme.colours.label, 0.1)};
      }

      &:hover {
        border-color: ${darken(0.25, theme.colours.label)};
      }

      + * {
        margin-left: 3px;
      }
    }
  `}
  }
`
