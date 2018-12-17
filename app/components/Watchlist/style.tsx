import Module from '@/components/Module'
import { BaphoTheme } from '@/theme'
import { darken, rgba } from 'polished'
import styled, { css } from 'styled-components'

export default styled<any>(Module)`
  ${({ theme }: BaphoTheme) => css`
    [data-draggable] {
      width: 600px;
      padding-bottom: calc(var(--pad) / 2);
      overflow: hidden;
      border: 1px solid transparent;
      border-radius: var(--radius) var(--radius) 0 0;
      box-shadow: -8px -8px 50px 0 ${darken(0.03, theme.colours.panel)};
      transition: ${theme.eases.base};
      transition-property: border-color, width, height;

      &:hover {
        border-color: ${theme.colours.focus};
      }

      &.dragging > * {
        pointer-events: none;
      }

      h5 {
        margin: 0;
        padding: calc(var(--pad) / 2);
        border-bottom: 1px solid ${rgba(theme.colours.border, 0.33)};

        @media (max-width: 768px) {
          padding: var(--pad);
          padding-left: 0;

          > span {
            font-size: 0px;
          }
        }
      }

      section {
        width: 600px;
        height: 150px;
        overflow: auto;
        transition: ${theme.eases.base};
        transform-origin: right bottom;
      }

      &[data-open='false'] {
        width: 165px;
        height: 45px;

        section {
          opacity: 0;
          transform: translate(0, 10px);
        }
      }
    }

    > div {
      padding: 0;

      section {
        display: grid;
        grid-template-columns: min-content 25px 1fr max-content max-content;
        align-items: center;
        grid-gap: 1em;
        max-height: 33vh;
        overflow: auto;
        padding: calc(var(--pad) / 2);
        padding-bottom: var(--pad);

        &.open-false {
        }

        @media (max-width: 768px) {
          width: 66vw;
        }

        article > * {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  `}
`
