import { Box } from 'rebass'
import styled, { keyframes } from 'styled-components'

const animIn = keyframes`
from {
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  transform: scale(0.98);
}
`

const animOut = keyframes`
to {
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
  transform: scale(0.98);
}
`

export default styled<any>(Box)`
  display: inline-block;
  line-height: 1;
  margin: 2px;
  padding: 2px 4px;
  border: 1px solid transparent;
  border-radius: var(--radius);
  white-space: nowrap;
  overflow: hidden;
  animation: ${animIn} ${({ theme }) => theme.eases.base} forwards;

  &.anim-out {
    animation-name: ${animOut};
  }
`
