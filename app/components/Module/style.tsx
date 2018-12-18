import { rgba } from 'polished'
import { Box } from 'rebass'
import styled, { css } from 'styled-components'

const Module = ({ className, ...props }) => (
  <Box as="aside" css="position: relative" className={className}>
    <Box {...props} />
  </Box>
)

export default styled<any>(Module)`
  ${({ theme }) => css`
    &:after {
      opacity: 0.1;
      z-index: 9;
      pointer-events: none;
      content: '';
      position: absolute;
      right: calc(var(--pad) / 2);
      bottom: 0;
      left: 0;
      height: 15%;
      background: linear-gradient(
        180deg,
        transparent 22%,
        ${theme.colours.panel} 82%,
        ${theme.colours.panel}
      );
    }

    > div {
      border-radius: var(--radius);
      background: ${theme.colours.module};

      section {
        padding: calc(var(--pad) / 2);
      }
    }

    h5 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      padding: 1em;
      border-bottom: 1px solid ${rgba(theme.colours.border, 0.33)};

      @media (max-width: 768px) {
        padding: var(--pad);
        padding-left: 0;

        > span {
          font-size: 0px;
        }
      }

      &:only-child {
        margin: 0;
      }
    }
  `}
`
