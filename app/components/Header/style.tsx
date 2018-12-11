import { BaphoTheme } from '@/theme'
import { Flex } from 'rebass'
import styled, { css } from 'styled-components'

export default styled<any>(Flex)`
  ${({ theme }: BaphoTheme) => css`
    grid-area: head;
    display: grid;
    grid-template-columns: var(--mainGrid);
    grid-column-gap: var(--pad);
    align-items: center;
    position: relative;
    padding: var(--pad) 0;

    > h1 {
      color: ${theme.colours.base};
      font-size: initial;
      text-transform: uppercase;
    }

    > form {
      align-self: stretch;
      position: relative;
      transition: ${theme.eases.base};

      section {
        z-index: 100;
        position: absolute;
        top: calc(100% + var(--pad) / 2);
        right: 0;
        left: 0;
        padding: var(--pad);
        border-radius: var(--radius);
        background: ${theme.colours.module};

        ul,
        li {
          display: block;
          margin: 0;
          padding: 0;
        }

        ul {
          max-height: 200px;
          overflow: auto;
        }
      }

      &.loading {
        pointer-events: none;
        cursor: wait;
        opacity: 0.5;
      }
    }
  `}
`
