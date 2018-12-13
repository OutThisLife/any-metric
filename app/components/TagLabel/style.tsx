import { timingFunctions } from 'polished'
import { Box } from 'rebass'
import styled, { keyframes } from 'styled-components'

const animIn = keyframes`
from {
  opacity: 0;
  width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
`

const animOut = keyframes`
to {
  opacity: 0;
  width: 0;
  margin: 0;
  padding: 0;
  border: 0;
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
  animation: none 0.2s ${timingFunctions('easeOutQuad')} forwards;

  &.anim-in {
    animation-name: ${animIn};
  }

  &.anim-out {
    animation-name: ${animOut};
  }
`
