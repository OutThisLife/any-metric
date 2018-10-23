import styled from 'styled-components'

export default styled.div`
  transform: translate(0, var(--pad));

  a {
    display: inline-block;
    padding: 0.7em 0;
    box-shadow: inset 0 -2px currentColor;

    &.active sup {
      display: none;
    }

    &:not(.active):not(:hover) {
      box-shadow: none;
    }
  }
`
