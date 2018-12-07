import { rgba } from 'polished'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

export default styled(Box)`
  ${({ theme }) => css`
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    right: calc(var(--pad) * 2);
    transform: translate(50%, -50%);
    transition: ${theme.eases.base};

    @media (max-width: 1025px) {
      display: none;
    }

    > .circle-picker {
      display: flex;
      align-items: center;
      flex-direction: column;

      &:not(:hover) .circle-picker {
        opacity: 0.4;
      }

      > div {
        flex-direction: inherit;
        width: auto !important;
        margin-bottom: 1em;
      }

      > a svg {
        fill: ${theme.colours.secondary} !important;
      }
    }

    > form {
      z-index: 9999;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 33vw;
      box-shadow: -5px 0 5px 0 ${rgba(theme.colours.panel, 0.5)};
      background: ${theme.colours.panel};

      > div:last-of-type {
        display: flex;
        align-items: stretch;
        justify-content: left;
        width: 100%;
        height: 100%;
        padding: 0;
      }

      textarea {
        display: block;
        width: 100%;
        height: 100%;
        color: ${theme.colours.muted};
        font-size: 1.5rem;
        line-height: 1.5;
        font-family: monospace;
      }

      .controls {
        z-index: 2;
        position: absolute;
        top: var(--pad);
        right: var(--pad);
      }
    }
  `}
`
