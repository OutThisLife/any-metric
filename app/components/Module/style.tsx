import { Box } from 'rebass'
import styled, { css } from 'styled-components'

const Module = ({ className, ...props }) => (
  <Box css="position: relative" className={className}>
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
      padding: var(--pad);
      border-radius: var(--radius);
      background: ${theme.colours.module};
    }

    h5 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 calc(var(--pad) / 2);
      padding: 0;

      &:only-child {
        margin: 0;
      }
    }
  `}
`
