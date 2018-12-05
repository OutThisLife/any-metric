import { Box } from 'rebass'
import styled, { css } from 'styled-components'

const Module = ({ className, ...props }) => (
  <Box as="div" css="position: relative" className={className}>
    <Box as="div" {...props} />
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
      border-radius: 2px;
      background: ${theme.colours.module};
    }
  `}
`
